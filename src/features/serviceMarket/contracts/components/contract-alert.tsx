import { FC } from 'react';
import { Trans } from 'react-i18next';
import { Space } from 'antd';
import { useSmartContractAction } from 'features/hooks';
import {
    ContractDto,
    ContractStates,
    getContractStatus,
    isContractTermNotFulfilled,
    isDeadlineViolation,
    isTimeFinished,
    terminateContract,
} from 'entities/smartcontract';
import { ContractAlert as Alert, Button } from 'shared/ui';
import { useReloadPage } from 'shared/lib/hooks';
import { fromUnit } from 'shared/lib/utils';
import { Completed } from '../../ui/actions';

export const ContractAlert: FC<{
    contract: ContractDto;
    accountName: string;
}> = ({ contract, accountName }) => {
    const { value: state } = getContractStatus(contract, accountName);

    const isUserClient = contract.client === accountName;
    const isUserExecutor = contract.executor === accountName;

    const isClientCollectedPenalty =
        contract.penalty_demanded_by === contract.client;
    const isExecutorCollectedPenalty =
        contract.penalty_demanded_by === contract.executor;
    const isPenaltyDemanded = !!contract.penalty_demanded_by;

    const isContractFinished = isTimeFinished(contract);
    const isDeleted = !!contract.deleted_at;
    const isTerminated = contract.term_time > 0;
    const isCompleted = state === ContractStates.completed;

    const isExecutorTermInitiator =
        contract.executor === contract.term_initiator;
    const isClientTermInitiator = contract.client === contract.term_initiator;

    const isExecutorViolated =
        isDeadlineViolation(contract) ||
        isContractTermNotFulfilled(contract) ||
        isExecutorTermInitiator;

    const terminateContractAction = useSmartContractAction({
        action: terminateContract(accountName, contract.id, false),
        onSignSuccess: useReloadPage(),
    });

    const collectPenaltyAction = useSmartContractAction({
        action: terminateContract(accountName, contract.id, true),
        onSignSuccess: useReloadPage(),
    });

    const dontCollectPenaltyAction = useSmartContractAction({
        action: terminateContract(accountName, contract.id, false),
        onSignSuccess: useReloadPage(),
    });

    // User is executor (Mineowner | Contractor)
    if (isUserExecutor) {
        // Contract has been finished
        if (isContractFinished) {
            // Contract has been completed & client collected penalty
            if (
                isExecutorViolated &&
                isTerminated &&
                isClientCollectedPenalty
            ) {
                return (
                    <Alert
                        message={
                            <Trans
                                values={{
                                    amount: fromUnit(contract.penalty_amount),
                                }}
                                i18nKey="pages.serviceMarket.contract.violatedByMeCounterpartyCompletedAndCollectedPenalty"
                            />
                        }
                    />
                );
            }

            // Contract has been completed & client didnt collect penalty
            if (isExecutorViolated && isTerminated && !isPenaltyDemanded) {
                return (
                    <Alert
                        message={
                            <Trans
                                values={{
                                    amount: fromUnit(contract.penalty_amount),
                                }}
                                i18nKey="pages.serviceMarket.contract.violatedByMeCounterpartyCompletedAndDidntCollectPenalty"
                            />
                        }
                    />
                );
            }

            // Executor violated terms
            if (isExecutorViolated) {
                return (
                    <Alert
                        message={
                            <Trans i18nKey="pages.serviceMarket.contract.violatedByMeContractHasEndedWaitCounterparty" />
                        }
                        action={
                            !isTerminated && (
                                <Button
                                    ghost
                                    type="primary"
                                    onClick={terminateContractAction}
                                >
                                    <Trans i18nKey="pages.serviceMarket.contract.completeContract" />
                                </Button>
                            )
                        }
                    />
                );
            }

            // Contract has been successfully completed
            if (isCompleted && !isExecutorViolated) {
                return (
                    <Alert
                        message={
                            <Trans
                                i18nKey="pages.serviceMarket.contract.completedContract"
                                values={{
                                    amount: fromUnit(contract.penalty_amount),
                                }}
                            />
                        }
                    />
                );
            }

            // Contract has been successfully completed & wait executor confirmation
            if (isCompleted) {
                return (
                    <Completed
                        contractId={contract.id}
                        accountName={accountName}
                        onComplete={async () => {
                            await terminateContractAction();
                        }}
                    />
                );
            }
        }

        // Contract has been terminated by client & client collected penalty
        if (
            isExecutorViolated &&
            isClientTermInitiator &&
            isDeleted &&
            isClientCollectedPenalty
        ) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.violatedByMeCounterpartyTerminatedAndCollectedPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by client & client collected penalty
        if (
            isExecutorViolated &&
            isClientTermInitiator &&
            isDeleted &&
            !isPenaltyDemanded
        ) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.violatedByMeCounterpartyTerminatedAndDidntCollectPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by executor and wait client
        if (isExecutorViolated && isExecutorTermInitiator) {
            return (
                <Alert
                    message={
                        <Trans i18nKey="pages.serviceMarket.contract.terminatedByMeWaitCounterparty" />
                    }
                />
            );
        }

        // Contract has been terminated by executor & client collected penalty
        if (
            isExecutorViolated &&
            isExecutorTermInitiator &&
            isDeleted &&
            isClientCollectedPenalty
        ) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.terminatedByMeCounterpartyCollectedPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by executor & client didnt collect penalty
        if (
            isExecutorViolated &&
            isExecutorTermInitiator &&
            isDeleted &&
            !isPenaltyDemanded
        ) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.terminatedByMeCounterpartyDidntCollectPenalty"
                        />
                    }
                />
            );
        }

        // Contract has not been finished & executor violated terms
        if (isExecutorViolated) {
            return (
                <Alert
                    message={
                        <Trans i18nKey="pages.serviceMarket.contract.violatedByMeWaitCounterparty" />
                    }
                />
            );
        }

        // Contract has been terminated by client & executor collected penalty
        if (isClientTermInitiator && isDeleted && isExecutorCollectedPenalty) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.terminatedByCounterpartyICollectedPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by client & executor didnt collect penalty
        if (isClientTermInitiator && isDeleted && !isPenaltyDemanded) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.terminatedByCounterpartyIDidntCollectPenalty"
                        />
                    }
                />
            );
        }

        // Contract has not been finished & terminated by client
        if (isClientTermInitiator) {
            return (
                <Alert
                    message={
                        <Trans i18nKey="pages.serviceMarket.contract.terminatedByCounterpartyWaitMe" />
                    }
                    action={
                        <Space>
                            <Button
                                ghost
                                type="primary"
                                onClick={collectPenaltyAction}
                            >
                                <Trans i18nKey="pages.serviceMarket.contract.collectPenalty" />
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                onClick={dontCollectPenaltyAction}
                            >
                                <Trans i18nKey="pages.serviceMarket.contract.noCollectPenalty" />
                            </Button>
                        </Space>
                    }
                />
            );
        }
    }

    // User is client (Landlord | Mineowner)
    if (isUserClient) {
        // Contract has been finished
        if (isContractFinished) {
            // Contract has been completed & client collected penalty
            if (
                isExecutorViolated &&
                isTerminated &&
                isClientCollectedPenalty
            ) {
                return (
                    <Alert
                        message={
                            <Trans
                                values={{
                                    amount: fromUnit(contract.penalty_amount),
                                }}
                                i18nKey="pages.serviceMarket.contract.violatedByCounterpartyICompletedAndCollectedPenalty"
                            />
                        }
                    />
                );
            }

            // Contract has been completed & client didnt collect penalty
            if (isExecutorViolated && isTerminated && !isPenaltyDemanded) {
                return (
                    <Alert
                        message={
                            <Trans
                                values={{
                                    amount: fromUnit(contract.penalty_amount),
                                }}
                                i18nKey="pages.serviceMarket.contract.violatedByCounterpartyICompletedAndDidntCollectPenalty"
                            />
                        }
                    />
                );
            }

            // Executor violated terms
            if (isExecutorViolated) {
                return (
                    <Alert
                        message={
                            <Trans i18nKey="pages.serviceMarket.contract.violatedByCounterpartyContractCanCompleteWaitMe" />
                        }
                        action={
                            <Space>
                                <Button
                                    ghost
                                    type="primary"
                                    onClick={collectPenaltyAction}
                                >
                                    <Trans i18nKey="pages.serviceMarket.contract.collectPenaltyAndComplete" />
                                </Button>
                                <Button
                                    ghost
                                    type="primary"
                                    onClick={dontCollectPenaltyAction}
                                >
                                    <Trans i18nKey="pages.serviceMarket.contract.dontCollectPenaltyAndComplete" />
                                </Button>
                            </Space>
                        }
                    />
                );
            }

            // Contract has been successfully completed
            if (
                (isCompleted && !isExecutorViolated) ||
                isExecutorTermInitiator
            ) {
                return (
                    <Alert
                        message={
                            <Trans
                                i18nKey="pages.serviceMarket.contract.completedContract"
                                values={{
                                    amount: fromUnit(contract.penalty_amount),
                                }}
                            />
                        }
                    />
                );
            }

            // Contract has been successfully completed & wait executor confirmation
            if (isCompleted) {
                return (
                    <Completed
                        contractId={contract.id}
                        accountName={accountName}
                        onComplete={async () => {
                            await terminateContractAction();
                        }}
                    />
                );
            }
        }

        // Contract has been terminated by client & client collected penalty
        if (
            isExecutorViolated &&
            isClientTermInitiator &&
            isDeleted &&
            isClientCollectedPenalty
        ) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.violatedByCounterpartyITerminatedAndCollectedPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by client & client didnt collect penalty
        if (
            isExecutorViolated &&
            isClientTermInitiator &&
            isDeleted &&
            !isPenaltyDemanded
        ) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.violatedByCounterpartyITerminatedAndDidntCollectPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by client & executor collected penalty
        if (isClientTermInitiator && isDeleted && isExecutorCollectedPenalty) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.terminatedByMeCounterpartyCollectedPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by client & executor didnt collect penalty
        if (isClientTermInitiator && isDeleted && !isPenaltyDemanded) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.terminatedByMeCounterpartyDidntCollectPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by executor & client collected penalty
        if (
            isExecutorViolated &&
            isExecutorTermInitiator &&
            isDeleted &&
            isClientCollectedPenalty
        ) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.terminatedByCounterpartyICollectedPenalty"
                        />
                    }
                />
            );
        }

        // Contract has been terminated by executor & client didnt collect penalty
        if (
            isExecutorViolated &&
            isExecutorTermInitiator &&
            isDeleted &&
            !isPenaltyDemanded
        ) {
            return (
                <Alert
                    message={
                        <Trans
                            values={{
                                amount: fromUnit(contract.penalty_amount),
                            }}
                            i18nKey="pages.serviceMarket.contract.terminatedByCounterpartyIDidntCollectPenalty"
                        />
                    }
                />
            );
        }

        // Contract has not been finished & terminated by executor
        if (isExecutorTermInitiator) {
            return (
                <Alert
                    message={
                        <Trans i18nKey="pages.serviceMarket.contract.terminatedByCounterpartyWaitMe" />
                    }
                    action={
                        <Space>
                            <Button
                                ghost
                                type="primary"
                                onClick={collectPenaltyAction}
                            >
                                <Trans i18nKey="pages.serviceMarket.contract.collectPenalty" />
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                onClick={dontCollectPenaltyAction}
                            >
                                <Trans i18nKey="pages.serviceMarket.contract.noCollectPenalty" />
                            </Button>
                        </Space>
                    }
                />
            );
        }

        // Contract has not been finished & executor violated terms
        if (isExecutorViolated) {
            return (
                <Alert
                    message={
                        <Trans i18nKey="pages.serviceMarket.contract.violatedByCounterpartyContractCanTerminateWaitMe" />
                    }
                    action={
                        <Space>
                            <Button
                                ghost
                                type="primary"
                                onClick={collectPenaltyAction}
                            >
                                <Trans i18nKey="pages.serviceMarket.contract.collectPenaltyAndBreak" />
                            </Button>
                            <Button
                                ghost
                                type="primary"
                                onClick={dontCollectPenaltyAction}
                            >
                                <Trans i18nKey="pages.serviceMarket.contract.noCollectPenaltyAndBreak" />
                            </Button>
                        </Space>
                    }
                />
            );
        }

        // Contract has not been finished & client terminated
        if (isClientTermInitiator && !isDeleted) {
            return (
                <Alert
                    message={
                        <Trans i18nKey="pages.serviceMarket.contract.terminatedByMeWaitCounterparty" />
                    }
                />
            );
        }
    }

    return null;
};
