import { DAY_IN_SECONDS, getNowInSeconds } from 'shared';
import { ContractDto, ContractStatus } from './types';

export const getMissedDays = (
    feeDays: { key: number; value: number }[],
    daysPassed: number,
    feeDailyMinAmount: number
) => {
    return [...Array(Math.floor(daysPassed)).keys()].reduce((penalty, day) => {
        const workDay = feeDays[day]?.key;

        if (!feeDays[day]) penalty++;
        if (workDay > day) penalty++;
        if (workDay === day && feeDays[day]?.value < feeDailyMinAmount)
            penalty++;

        return penalty;
    }, 0);
};

export const isContractTermNotFulfilled = (contract: ContractDto) => {
    const {
        days_for_penalty,
        penalty_amount,
        fee_daily_min_amount,
        fee_days,
        start_time,
        finishes_at,
    } = contract;
    if (!start_time) return false;
    if (!penalty_amount) return false;
    if (!days_for_penalty) return false;

    const currentTime = Date.now();
    const finishesAt = finishes_at * 1000;
    const finishTime = finishesAt < currentTime ? finishesAt : currentTime;
    const daysPassed = (finishTime - start_time * 1000) / DAY_IN_SECONDS;

    const missedDays = getMissedDays(
        fee_days,
        daysPassed,
        fee_daily_min_amount
    );

    return missedDays >= days_for_penalty;
};

export type Status = {
    value:
        | 'openOrder'
        | 'validContract'
        | 'waitingForAction'
        | 'terminated'
        | 'completed';
    meta?: 'deadlineViolation' | 'termViolation' | 'earlyBreak' | 'complete';
};

const isStatusActive = (contract: ContractDto) =>
    contract.status === ContractStatus.active;

const isStatusTerminated = (contract: ContractDto) =>
    contract.status === ContractStatus.terminated;

const isTimeFinished = (contract: ContractDto) =>
    contract.finishes_at < getNowInSeconds();

const isDeadlineViolation = (contract: ContractDto) =>
    contract.start_time !== 0 && contract.start_time > contract.deadline_time;

export const isWorkInProgress = (contract: ContractDto) =>
    getNowInSeconds() > contract.create_time;

export const wasTerminatedBySomebody = (contract: ContractDto) =>
    contract.term_time > 0 || !!contract.term_initiator;

export const wasTerminatedEarly = (contract: ContractDto) =>
    contract.term_time < contract.finishes_at;

export const getContractStatus = (
    contract: ContractDto,
    account: string
): Status => {
    if (!contract.client || !contract.executor) return { value: 'openOrder' };

    const isUserClient = contract.client === account;

    if (
        isStatusActive(contract) &&
        isWorkInProgress(contract) &&
        !isTimeFinished(contract)
    ) {
        return { value: 'validContract' };
    }

    // the executor logic here will be added in the future
    if (isDeadlineViolation(contract) && isUserClient) {
        return { value: 'waitingForAction', meta: 'deadlineViolation' };
    }
    // the executor logic here will be added in the future
    if (isContractTermNotFulfilled(contract) && isUserClient) {
        return { value: 'waitingForAction', meta: 'termViolation' };
    }
    if (wasTerminatedBySomebody(contract) && wasTerminatedEarly(contract)) {
        if (contract.term_initiator !== account) {
            return { value: 'waitingForAction', meta: 'earlyBreak' };
        }
        return { value: 'terminated' };
    }

    if (isTimeFinished(contract) && !isContractTermNotFulfilled(contract)) {
        if (isStatusActive(contract)) {
            return { value: 'waitingForAction', meta: 'complete' };
        }
        if (isStatusTerminated(contract)) {
            return { value: 'completed' };
        }
    }

    return { value: 'validContract' };
};
