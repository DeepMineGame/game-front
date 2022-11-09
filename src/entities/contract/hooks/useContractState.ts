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
    TerminatedByMeCounterpartyCollectedFine = 'terminatedByMeCounterpartyCollectedFine',
    TerminatedByMeCounterpartyDidntCollectFine = 'terminatedByMeCounterpartyDidntCollectFine',
    TerminatedByCounterpartyICollectedFine = 'terminatedByCounterpartyICollectedFine',
    TerminatedByCounterpartyIDidntCollectFine = 'terminatedByCounterpartyIDidntCollectFine',
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

    const isTerminatedByMeCounterpartyCollectedFine =
        isTerminatedByMe && isPenaltyDemanded && isDeleted;
    if (isTerminatedByMeCounterpartyCollectedFine)
        terminateState = TerminateState.TerminatedByMeCounterpartyCollectedFine;

    const isTerminatedByMeCounterpartyDidntCollectFine =
        isTerminatedByMe && !isPenaltyDemanded && isDeleted;
    if (isTerminatedByMeCounterpartyDidntCollectFine)
        terminateState =
            TerminateState.TerminatedByMeCounterpartyDidntCollectFine;

    const isTerminatedByCounterpartyICollectedFine =
        !isTerminatedByMe && isPenaltyDemanded && isDeleted;
    if (isTerminatedByCounterpartyICollectedFine)
        terminateState = TerminateState.TerminatedByCounterpartyICollectedFine;

    const isTerminatedByCounterpartyIDidntCollectFine =
        !isTerminatedByMe && !isPenaltyDemanded && isDeleted;
    if (isTerminatedByCounterpartyIDidntCollectFine)
        terminateState =
            TerminateState.TerminatedByCounterpartyIDidntCollectFine;

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
