import {
    ContractDto,
    ContractStates,
    ContractStatesMeta,
    ContractStatus,
    getContractStatus,
} from 'entities/smartcontract';
import { useContractType } from './useContractType';

const VIOLATION_STATES = [
    ContractStatesMeta.deadlineViolation,
    ContractStatesMeta.termViolation,
    ContractStatesMeta.earlyBreak,
];

export enum TerminateState {
    undefined = 'undefined',
    TerminatedByMeWaitCounterparty = 'terminatedByMeWaitCounterparty',
    TerminatedByMeCounterpartyCollectedPenalty = 'terminatedByMeCounterpartyCollectedPenalty',
    TerminatedByMeCounterpartyDidntCollectPenalty = 'terminatedByMeCounterpartyDidntCollectPenalty',
    TerminatedByCounterpartyICollectedPenalty = 'terminatedByCounterpartyICollectedPenalty',
    TerminatedByCounterpartyIDidntCollectPenalty = 'terminatedByCounterpartyIDidntCollectPenalty',
}

export enum ViolationState {
    undefined = 'undefined',

    ViolatedByMeWaitCounterparty = 'violatedByMeWaitCounterparty',
    ViolatedAndTerminatedByMeWaitCounterparty = 'violatedAndTerminatedByMeWaitCounterparty',
    ViolatedAndCompletedByMeWaitCounterparty = 'violatedAndCompletedByMeWaitCounterparty',

    ViolatedByMeCounterpartyTerminatedAndCollectedPenalty = 'violatedByMeCounterpartyTerminatedAndCollectedPenalty',
    ViolatedByMeCounterpartyTerminatedAndDidntCollectPenalty = 'violatedByMeCounterpartyTerminatedAndDidntCollectPenalty',

    ViolatedByMeCounterpartyCompletedAndCollectedPenalty = 'violatedByMeCounterpartyCompletedAndCollectedPenalty',
    ViolatedByMeCounterpartyCompletedAndDidntCollectPenalty = 'violatedByMeCounterpartyCompletedAndDidntCollectPenalty',

    ViolatedByCounterpartyWaitMe = 'violatedByCounterpartyWaitMe',
    ViolatedByCounterpartyITerminatedAndCollectedPenalty = 'violatedByCounterpartyITerminatedAndCollectedPenalty',
    ViolatedByCounterpartyITerminatedAndDidntCollectPenalty = 'violatedByCounterpartyITerminatedAndDidntCollectPenalty',

    ViolatedByCounterpartyICompletedAndCollectedPenalty = 'violatedByCounterpartyICompletedAndCollectedPenalty',
    ViolatedByCounterpartyICompletedAndDidntCollectPenalty = 'violatedByCounterpartyICompletedAndDidntCollectPenalty',
}

export const useContractState = (
    contract: ContractDto,
    accountName: string
) => {
    const { value: state, meta: stateMeta } = getContractStatus(
        contract,
        accountName
    );
    const { isContract } = useContractType(contract);

    const isDeleted = !!contract.deleted_at;
    const isClient = contract.client === accountName;
    const isExecutor = contract.executor === accountName;
    const isContractMember = isClient || isExecutor;

    let terminateState = TerminateState.undefined;
    const isPenaltyDemanded = !!contract.penalty_demanded_by;
    const isTerminatedByMe = contract.term_initiator === accountName;

    const isTerminatedByMeWaitCounterparty = isTerminatedByMe && !isDeleted;
    if (isTerminatedByMeWaitCounterparty)
        terminateState = TerminateState.TerminatedByMeWaitCounterparty;

    const isTerminatedByMeCounterpartyCollectedPenalty =
        isTerminatedByMe && isPenaltyDemanded && isDeleted;
    if (isTerminatedByMeCounterpartyCollectedPenalty)
        terminateState =
            TerminateState.TerminatedByMeCounterpartyCollectedPenalty;

    const isTerminatedByMeCounterpartyDidntCollectPenalty =
        isTerminatedByMe && !isPenaltyDemanded && isDeleted;
    if (isTerminatedByMeCounterpartyDidntCollectPenalty)
        terminateState =
            TerminateState.TerminatedByMeCounterpartyDidntCollectPenalty;

    const isTerminatedByCounterpartyICollectedPenalty =
        !isTerminatedByMe && isPenaltyDemanded && isDeleted;
    if (isTerminatedByCounterpartyICollectedPenalty)
        terminateState =
            TerminateState.TerminatedByCounterpartyICollectedPenalty;

    const isTerminatedByCounterpartyIDidntCollectPenalty =
        !isTerminatedByMe && !isPenaltyDemanded && isDeleted;
    if (isTerminatedByCounterpartyIDidntCollectPenalty)
        terminateState =
            TerminateState.TerminatedByCounterpartyIDidntCollectPenalty;

    const isCompleted =
        state === ContractStates.completed || (isDeleted && isContract);
    const isNeedComplete = stateMeta === ContractStatesMeta.complete;
    const isActive = contract.status === ContractStatus.active;
    const isTerminated = state === ContractStates.terminated;

    const isTermViolation = VIOLATION_STATES.includes(
        stateMeta as ContractStatesMeta
    );

    const canTerminate =
        isContractMember && isActive && !isNeedComplete && !isTermViolation;

    const showPenaltyActions = isTermViolation && isContractMember;
    const showTerminatedAlert = isTerminated && isContractMember;
    const showCompleted = isNeedComplete && isContractMember;

    return {
        isDeleted,
        isClient,
        isExecutor,
        isContractMember,
        isNeedComplete,
        isCompleted,
        isActive,
        isTermViolation,
        isTerminated,
        state,
        stateMeta,
        canTerminate,
        showTerminatedAlert,
        showPenaltyActions,
        showCompleted,
        terminateState,
    };
};
