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
    if (!Number(penalty_amount)) return false;
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

export enum ContractStates {
    openOrder = 'openOrder',
    valid = 'validContract',
    terminated = 'terminated',
    completed = 'completed',
    waitingForAction = 'waitingForAction',
}

export enum ContractStatesMeta {
    deadlineViolation = 'deadlineViolation',
    termViolation = 'termViolation',
    earlyBreak = 'earlyBreak',
    deadlineExpired = 'deadlineExpired',
    complete = 'complete',
}

export type Status = {
    value: ContractStates;
    meta?: ContractStatesMeta;
};

export const isStatusActive = (contract: ContractDto) =>
    contract.status === ContractStatus.active;

export const isStatusTerminated = (contract: ContractDto) =>
    contract.status === ContractStatus.terminated;

export const isTimeFinished = (contract: ContractDto) =>
    contract.finishes_at < getNowInSeconds();

export const isDeadlineViolation = (contract: ContractDto) =>
    contract.start_time !== 0 && contract.start_time > contract.deadline_time;

export const isWorkInProgress = (contract: ContractDto) =>
    getNowInSeconds() > contract.create_time;

export const wasTerminatedBySomebody = (contract: ContractDto) =>
    contract.term_time > 0 || !!contract.term_initiator;

export const wasTerminatedEarly = (contract: ContractDto) =>
    contract.term_time < contract.finishes_at;

export const wasTerminatedAfterDeadline = (contract: ContractDto) =>
    contract.term_time > contract.deadline_time;

export const getContractStatus = (
    contract: ContractDto,
    account: string
): Status => {
    if (
        !contract.client ||
        !contract.executor ||
        (contract.client === contract.executor &&
            !contract.activation_time &&
            !wasTerminatedBySomebody(contract))
    )
        return { value: ContractStates.openOrder };

    const isUserClient = contract.client === account;

    if (
        isStatusActive(contract) &&
        isWorkInProgress(contract) &&
        !isTimeFinished(contract)
    ) {
        return { value: ContractStates.valid };
    }

    // the executor logic here will be added in the future
    if (isDeadlineViolation(contract) && isUserClient) {
        return {
            value: ContractStates.waitingForAction,
            meta: ContractStatesMeta.deadlineViolation,
        };
    }
    // the executor logic here will be added in the future
    if (isContractTermNotFulfilled(contract) && isUserClient) {
        return {
            value: ContractStates.waitingForAction,
            meta: ContractStatesMeta.termViolation,
        };
    }
    if (wasTerminatedBySomebody(contract) && wasTerminatedEarly(contract)) {
        if (contract.term_initiator !== account) {
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.earlyBreak,
            };
        }
        return { value: ContractStates.terminated };
    }

    if (isTimeFinished(contract) && !isContractTermNotFulfilled(contract)) {
        if (
            !contract.deleted_at &&
            (isStatusActive(contract) ||
                (isStatusTerminated(contract) &&
                    contract.term_initiator !== account))
        ) {
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.complete,
            };
        }
        if (isStatusTerminated(contract)) {
            return { value: ContractStates.completed };
        }
    }

    return { value: ContractStates.valid };
};
