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

/**
 * Deprecated - use backend state and subState instead
 * @param contract
 * @param accountName
 * @sse https://www.figma.com/file/8agyvDM2HbbgnKWDJmPaUi/DM-Game-main?node-id=9658-327934&t=8KBQktAmGqJ64By8-0
 */
export const useContractState = (
    contract: ContractDto,
    accountName: string
) => {
    const { value: state, meta: stateMeta } = getContractStatus(
        contract,
        accountName
    );
    const { isContract, isSelfSigned } = useContractType(contract);

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

    // delete self contract after terminate
    const canDeleteSelfContract =
        isContractMember && isSelfSigned && !canTerminate && !isDeleted;

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
        canDeleteSelfContract,
        showTerminatedAlert,
        showCompleted,
    };
};
