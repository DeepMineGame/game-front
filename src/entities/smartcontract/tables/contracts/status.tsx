import { DAY_IN_SECONDS, getNowInSeconds } from 'shared';
import { ContractDto, ContractStatus } from './types';

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

    if (wasTerminatedBySomebody(contract) && wasTerminatedEarly(contract)) {
        if (contract.term_initiator !== account) {
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.earlyBreak,
            };
        }
        return { value: ContractStates.terminated };
    }

    if (isTimeFinished(contract)) {
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
