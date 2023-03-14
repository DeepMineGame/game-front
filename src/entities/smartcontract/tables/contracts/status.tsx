import { getNowInSeconds } from 'shared';
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

export const isStatusTerminated = (contract: ContractDto) =>
    contract.status === ContractStatus.terminated;

export const isTimeFinished = (contract: ContractDto) =>
    contract.finishes_at < getNowInSeconds();

export const wasTerminatedAfterDeadline = (contract: ContractDto) =>
    contract.term_time > contract.deadline_time;
