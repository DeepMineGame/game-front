import {
    ContractDto,
    ContractStates,
    ContractStatesMeta,
    ContractStatus,
    getContractStatus,
} from 'entities/smartcontract';

const VIOLATION_STATES = [
    ContractStatesMeta.deadlineViolation,
    ContractStatesMeta.termViolation,
    ContractStatesMeta.earlyBreak,
];

export const useContractState = (
    contract: ContractDto,
    accountName: string
) => {
    const { value: state, meta: stateMeta } = getContractStatus(
        contract,
        accountName
    );

    const isEarlyBreakBySomebody =
        state === ContractStates.waitingForAction &&
        stateMeta === ContractStatesMeta.earlyBreak;
    const isEarlyBreakByCurrentUser = state === ContractStates.terminated;
    const isCompleted = state === ContractStates.completed;
    const isNeedComplete = stateMeta === ContractStatesMeta.complete;
    const isActive = contract.status === ContractStatus.active;
    const isTerminated = state === ContractStates.terminated;

    const isTermViolation = VIOLATION_STATES.includes(
        stateMeta as ContractStatesMeta
    );

    const isDeleted = !!contract.deleted_at;
    const isClient = contract.client === accountName;
    const isExecutor = contract.executor === accountName;
    const isContractMember = isClient || isExecutor;
    const isDemandPenaltyByClient = !!contract.demand_penalty_by_client;
    const isCurrentUserDemandPenalty = isClient && isDemandPenaltyByClient;
    const isSomebodyDemandPenalty = !isClient && isDemandPenaltyByClient;
    const isCurrentUserDoesntDemandPenalty =
        isClient && !isDemandPenaltyByClient;
    const isSomebodyDoesntDemandPenalty = !isClient && !isDemandPenaltyByClient;

    const canTerminate =
        isContractMember && isActive && !isNeedComplete && !isTermViolation;

    const showPenaltyActions = isTermViolation && isContractMember;
    const showPenaltyMessage =
        (isEarlyBreakBySomebody || isEarlyBreakByCurrentUser) &&
        (isCurrentUserDemandPenalty ||
            isCurrentUserDoesntDemandPenalty ||
            isSomebodyDemandPenalty ||
            isSomebodyDoesntDemandPenalty);
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
        showPenaltyMessage,
        isCurrentUserDemandPenalty,
        isCurrentUserDoesntDemandPenalty,
        isSomebodyDemandPenalty,
        isSomebodyDoesntDemandPenalty,
    };
};
