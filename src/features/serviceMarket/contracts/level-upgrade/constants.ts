import {
    ContractDto,
    ContractStates,
    ContractStatesMeta,
    isStatusTerminated,
    wasTerminatedAfterDeadline,
    Status,
} from 'entities/smartcontract';

const getContractState = (
    contract: ContractDto,
    accountName: string
): Status => {
    const isOrder = !contract.client || !contract.executor;
    const isDeleted = !!contract.deleted_at;

    const upgradeStarted = contract.start_time > 0;
    const upgradeFinishTime = contract.finishes_at * 1000;

    const isTerminatedAfterDeadline = wasTerminatedAfterDeadline(contract);
    const isTerminated = contract.term_time > 0;

    const isFinished = upgradeStarted && Date.now() >= upgradeFinishTime;
    const isDeadlineViolation = Date.now() > contract.deadline_time * 1000;

    if (isOrder) {
        return { value: ContractStates.openOrder };
    }

    // not start and terminate
    if (!upgradeStarted && isTerminated) {
        // some one terminate
        if (contract.term_initiator !== accountName && !contract.deleted_at) {
            // after deadline start
            if (isTerminatedAfterDeadline) {
                return {
                    value: ContractStates.waitingForAction,
                    meta: ContractStatesMeta.deadlineExpired,
                };
            }

            // before deadline start
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.earlyBreak,
            };
        }

        // i'am terminated
        return {
            value: ContractStates.terminated,
            meta: isTerminatedAfterDeadline
                ? ContractStatesMeta.deadlineExpired
                : ContractStatesMeta.earlyBreak,
        };
    }

    // not start
    if (!upgradeStarted) {
        // deadline violation
        if (isDeadlineViolation) {
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.deadlineViolation,
            };
        }

        return { value: ContractStates.valid };
    }

    // upgrade complete
    if (isFinished) {
        if (
            (!isDeleted || isStatusTerminated(contract)) &&
            contract.term_initiator !== accountName
        ) {
            return {
                value: ContractStates.waitingForAction,
                meta: ContractStatesMeta.complete,
            };
        }

        return { value: ContractStates.completed };
    }

    return { value: ContractStates.valid };
};

const VIOLATION_STATES = [
    ContractStatesMeta.deadlineViolation,
    ContractStatesMeta.termViolation,
    ContractStatesMeta.deadlineExpired,
    ContractStatesMeta.earlyBreak,
];

const useLevelUpgradeContract = (
    contract: ContractDto,
    accountName: string
) => {
    const { value: state, meta: stateMeta } = getContractState(
        contract,
        accountName
    );

    const isTermViolation = VIOLATION_STATES.includes(
        stateMeta as ContractStatesMeta
    );

    const isDeleted = !!contract.deleted_at;
    const isClient = contract.client === accountName;
    const isEngineer = contract.executor === accountName;
    const isContractMember = isClient || isEngineer;
    const isTermInitiator = contract.term_initiator === accountName;

    const isTerminated = contract.term_time > 0;
    const upgradeStarted = contract.start_time > 0;

    const isNeedComplete = stateMeta === ContractStatesMeta.complete;
    const showComplete = isContractMember && isNeedComplete;

    const canTerminate = isContractMember && !upgradeStarted && !isTerminated;

    const isCompleted = state === ContractStates.completed;
    const isDeadlineStartExpired =
        stateMeta === ContractStatesMeta.deadlineViolation;
    const isTerminatedStatus = state === ContractStates.terminated;
    const isEarlyBreak = stateMeta === ContractStatesMeta.earlyBreak;
    const isDeadlineExpired = stateMeta === ContractStatesMeta.deadlineExpired;
    const isWaitingForAction = state === ContractStates.waitingForAction;

    return {
        canTerminate,
        showComplete,
        isDeleted,
        isClient,
        isEngineer,
        isTerminatedStatus,
        isWaitingForAction,
        isDeadlineStartExpired,
        isTermInitiator,
        isEarlyBreak,
        isDeadlineExpired,
        isCompleted,
        isNeedComplete,
        isTermViolation,
    };
};

export { useLevelUpgradeContract, getContractState };
