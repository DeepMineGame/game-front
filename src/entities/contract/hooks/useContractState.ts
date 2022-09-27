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
    const isEarlyBreakByExecutor = stateMeta === ContractStatesMeta.earlyBreak;
    const isCompleted =
        state === ContractStates.completed || (isDeleted && isContract);
    const isNeedComplete = stateMeta === ContractStatesMeta.complete;
    const isActive = contract.status === ContractStatus.active;
    const isTerminated = state === ContractStates.terminated;

    const isTermViolation = VIOLATION_STATES.includes(
        stateMeta as ContractStatesMeta
    );

    const isClient = contract.client === accountName;
    const isExecutor = contract.executor === accountName;
    const isContractMember = isClient || isExecutor;
    const isDemandPenaltyByClient = !!contract.demand_penalty_by_client;
    const isClientDemandPenalty = isClient && isDemandPenaltyByClient;
    const isExecutorAndClientDemandPenalty =
        isExecutor && isDemandPenaltyByClient;
    const isClientDoesntDemandPenalty = isClient && !isDemandPenaltyByClient;
    const isExecutorAndClientDoesntDemandPenalty =
        isExecutor && !isDemandPenaltyByClient;

    const canTerminate =
        isContractMember && isActive && !isNeedComplete && !isTermViolation;

    const showPenaltyActions = isTermViolation && isContractMember;
    const showPenaltyMessage =
        (isEarlyBreakByExecutor || isTerminated) &&
        (isClientDemandPenalty ||
            isClientDoesntDemandPenalty ||
            isExecutorAndClientDemandPenalty ||
            isExecutorAndClientDoesntDemandPenalty);
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
        isClientDemandPenalty,
        isClientDoesntDemandPenalty,
        isExecutorAndClientDemandPenalty,
        isExecutorAndClientDoesntDemandPenalty,
    };
};
