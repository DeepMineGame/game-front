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
    const isOrder = !contract.client || !contract.executor;

    const isUserClient = contract.client === account;
    const isUserExecutor = contract.executor === account;

    const isContractStarted = contract.start_time > 0;
    const isContractFinished = isContractStarted && isTimeFinished(contract);
    const isTerminated = !!contract.term_initiator;
    const isDeadlineViolated = isDeadlineViolation(contract);
    const isTermViolated = isContractTermNotFulfilled(contract);
    const isValid =
        isStatusActive(contract) &&
        isWorkInProgress(contract) &&
        isUserExecutor &&
        !isContractFinished;

    const isExecutorTermInitiator =
        contract.executor === contract.term_initiator;

    const isDeleted = contract.deleted_at > 0;

    if (isOrder) return { value: ContractStates.openOrder };

    if (isValid) return { value: ContractStates.valid };

    // User is client
    if (isUserClient) {
        // Executor violated deadline
        if (isDeadlineViolated && !isDeleted && !isTerminated) {
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.deadlineViolation,
            };
        }

        // Executor violated terms
        if (isTermViolated && !isDeleted && !isTerminated) {
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.termViolation,
            };
        }

        // Contract has been finished
        if (isContractFinished) {
            if (isExecutorTermInitiator && !isDeleted) {
                // Contract has been successfully completed & wait counterparty
                return {
                    value: ContractStates.waitingForAction,
                    meta: ContractStatesMeta.complete,
                };
            }

            // // Contract has been successfully completed
            // if (isDeleted || isTerminated) {
            return { value: ContractStates.completed };
            // }
        }

        if (isDeleted) {
            // Contract has been terminated early
            return {
                value: ContractStates.terminated,
                meta: ContractStatesMeta.earlyBreak,
            };
        }

        if (isExecutorTermInitiator) {
            // Contract has been terminated early
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.earlyBreak,
            };
        }

        return { value: ContractStates.valid };
    }

    // User is executor
    if (isUserExecutor) {
        // Contract has been finished
        if (isContractFinished) {
            // Contract has been deleted
            if (isDeleted) {
                // Executor violated deadline
                if (isDeadlineViolated) {
                    return {
                        value: ContractStates.completed,
                        meta: ContractStatesMeta.deadlineViolation,
                    };
                }

                // Executor violated terms
                if (isTermViolated) {
                    return {
                        value: ContractStates.completed,
                        meta: ContractStatesMeta.termViolation,
                    };
                }

                return { value: ContractStates.completed };
            }

            if (isTerminated && !isDeleted) {
                // Executor violated deadline
                if (isDeadlineViolated) {
                    return {
                        value: ContractStates.completed,
                        meta: ContractStatesMeta.deadlineViolation,
                    };
                }

                // Executor violated terms
                if (isTermViolated && !isDeleted) {
                    return {
                        value: ContractStates.completed,
                        meta: ContractStatesMeta.termViolation,
                    };
                }
            }

            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.complete,
            };
        }

        // Contract has been terminated early
        if (isDeleted || isTerminated) {
            return {
                value: ContractStates.terminated,
                meta: ContractStatesMeta.earlyBreak,
            };
        }

        // Executor violated deadline
        if (isDeadlineViolated) {
            return {
                value: ContractStates.valid,
                meta: ContractStatesMeta.deadlineViolation,
            };
        }

        // Executor violated terms
        if (isTermViolated) {
            return {
                value: ContractStates.valid,
                meta: ContractStatesMeta.termViolation,
            };
        }

        return { value: ContractStates.valid };
    }

    return { value: ContractStates.valid };
};
