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
    const isClient = contract.client === accountName;
    const isExecutor = contract.executor === accountName;
    const isContractMember = isClient || isExecutor;

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

    const showPenalty = isTermViolation && isContractMember;
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
        showPenalty,
        showCompleted,
    };
};
