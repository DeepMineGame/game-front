import { FC } from 'react';
import { Space } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { terminateContract, upgradeFinish } from 'entities/smartcontract';
import { ContractAlert, Button } from 'shared/ui';
import { useReloadPage } from 'shared/lib/hooks';
import { getDmeAmount } from 'shared/lib/utils';
import { useLevelUpgradeContract } from '../constants';
import { Completed } from '../../../ui/actions';
import { PenaltyActions } from '../../../ui';
import { ContractProps } from '../../../types';

export const ContractAlerts: FC<ContractProps> = ({
    contract,
    accountName,
}) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const isClientCollectedPenalty =
        contract.penalty_demanded_by === contract.client;
    const isEngineerCollectedPenalty =
        contract.penalty_demanded_by === contract.executor;

    const terminateContractAction = useSmartContractAction({
        action: terminateContract(accountName, contract.id, false),
        onSignSuccess: reloadPage,
    });

    const onTerminateContract = async () => {
        await terminateContractAction();
    };

    const signUpgradeFinish = useSmartContractAction({
        action: upgradeFinish(accountName, contract.id),
        onSignSuccess: reloadPage,
    });

    const completeUpgrade = async () => {
        await signUpgradeFinish();
    };

    const {
        showComplete,
        isDeleted,
        isClient,
        isEngineer,
        isTerminatedStatus,
        isDeadlineStartExpired,
        isTermInitiator,
        isEarlyBreak,
        isDeadlineExpired,
        isWaitingForAction,
    } = useLevelUpgradeContract(contract, accountName);

    if (isEngineer) {
        if (isTermInitiator) {
            // 1. Engineer early break
            if (isTerminatedStatus && isEarlyBreak)
                return (
                    <ContractAlert
                        message={
                            <Trans
                                i18nKey={
                                    isClientCollectedPenalty
                                        ? 'pages.serviceMarket.contract.terminatedByYouAndChargedPenalty'
                                        : 'pages.serviceMarket.contract.youTerminated'
                                }
                                values={{
                                    amount: getDmeAmount(
                                        contract.penalty_amount
                                    ),
                                }}
                            />
                        }
                    />
                );

            // 2. Engineer deadline break
            if (isTerminatedStatus && isDeadlineExpired) {
                return (
                    <ContractAlert
                        message={
                            <Trans i18nKey="pages.serviceMarket.contract.deadlinePassedMayCollectPenalty" />
                        }
                    />
                );
            }
        }

        // 3. Engineer not start work before deadline, Citizen might terminate
        if (isDeadlineStartExpired) {
            return (
                <ContractAlert
                    message={
                        <Trans i18nKey="pages.serviceMarket.contract.deadlinePassedMightCollectPenalty" />
                    }
                />
            );
        }

        // 4. Client early break
        if (isEarlyBreak && isWaitingForAction) {
            return (
                <PenaltyActions
                    isViolated={false}
                    amount={getDmeAmount(contract.penalty_amount)}
                    contractId={contract.id}
                />
            );
        }

        // 7. Terminated - Engineer charge penalty early from citizen
        // 9. Terminated - Engineer not charge penalty early
        if (isTerminatedStatus && isEarlyBreak) {
            return (
                <ContractAlert
                    message={
                        <Trans
                            i18nKey={`pages.serviceMarket.contract.${
                                isEngineerCollectedPenalty
                                    ? 'terminatedByCounterpartyYouCollectedPenalty'
                                    : 'terminatedByCounterpartyYouNotCollectedPenalty'
                            }`}
                            values={{
                                amount:
                                    getDmeAmount(contract.penalty_amount) * 2,
                            }}
                        />
                    }
                />
            );
        }

        // 5. Client break after deadline without penalty
        // 6. Client break after deadline with penalty
        // 8. Terminated - Client charge penalty after deadline
        // 10. Terminated - Client not charge penalty after deadline
        if (isDeadlineExpired) {
            return (
                <ContractAlert
                    message={
                        <Space direction="vertical" size={12}>
                            <Trans
                                i18nKey={`pages.serviceMarket.contract.${
                                    isClientCollectedPenalty
                                        ? 'deadlinePassedWithCollectPenalty'
                                        : 'deadlinePassedNoCollectPenalty'
                                }`}
                                values={{
                                    amount:
                                        getDmeAmount(contract.penalty_amount) *
                                        2,
                                }}
                            />

                            {isWaitingForAction && (
                                <Button
                                    ghost
                                    size="small"
                                    type="primary"
                                    onClick={onTerminateContract}
                                >
                                    {t(
                                        'pages.serviceMarket.contract.completeContract'
                                    )}
                                </Button>
                            )}
                        </Space>
                    }
                />
            );
        }
    }

    if (isClient) {
        // 1. Engineer early break
        // 2. Engineer deadline break
        // 3. Engineer not start work after deadline, Citizen might terminate
        if (
            isDeadlineStartExpired ||
            (isWaitingForAction && (isEarlyBreak || isDeadlineExpired))
        ) {
            return (
                <PenaltyActions
                    isViolated={isDeadlineStartExpired}
                    amount={getDmeAmount(contract.penalty_amount)}
                    contractId={contract.id}
                />
            );
        }

        if (isTermInitiator && isTerminatedStatus) {
            // 4. Client early break
            if (isEarlyBreak && !isDeleted) {
                return (
                    <ContractAlert
                        message={
                            <Trans i18nKey="pages.serviceMarket.contract.youTerminated" />
                        }
                    />
                );
            }

            // 5. Client break after deadline without
            // 6. Client break after deadline with penalty
            // 8. Terminated - Client charge penalty after deadline
            // 10. Terminated - Client not charge penalty after deadline
            if (isDeadlineExpired) {
                return (
                    <ContractAlert
                        message={
                            <Trans
                                i18nKey={`pages.serviceMarket.contract.${
                                    isClientCollectedPenalty
                                        ? 'terminatedByYouWithCollectPenalty'
                                        : 'terminatedByYouNotCollectPenalty'
                                }`}
                                values={{
                                    amount:
                                        getDmeAmount(contract.penalty_amount) *
                                        2,
                                }}
                            />
                        }
                    />
                );
            }
        }

        // 7. Terminated - Engineer charge penalty early
        // 9. Terminated - Engineer not charge penalty early
        if (isEarlyBreak && isDeleted) {
            return (
                <ContractAlert
                    message={
                        <Trans
                            i18nKey={`pages.serviceMarket.contract.${
                                isClientCollectedPenalty
                                    ? 'terminatedByCounterpartyYouCollectedPenalty'
                                    : 'terminatedByCounterpartyYouNotCollectedPenalty'
                            }`}
                            values={{
                                amount:
                                    getDmeAmount(contract.penalty_amount) * 2,
                            }}
                        />
                    }
                />
            );
        }
    }

    // 11. Complete by Engineer
    // 12. Complete by Client
    // 13. Upgrade Complete
    if (showComplete) {
        return (
            <Completed
                accountName={accountName}
                contractId={contract.id}
                onComplete={completeUpgrade}
            />
        );
    }

    return null;
};
