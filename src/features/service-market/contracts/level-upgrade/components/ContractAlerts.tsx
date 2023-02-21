import { FC } from 'react';
import { Space } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { terminateContract, upgradeFinish } from 'entities/smartcontract';
import { ContractAlert, Button } from 'shared/ui';
import { useReloadPage } from 'shared/lib/hooks';
import { useLevelUpgradeContract } from '../constants';
import { Completed } from '../../../ui/actions';
import { ContractProps } from '../../../types';

export const ContractAlerts: FC<ContractProps> = ({
    contract,
    accountName,
}) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const isClientCollectedPenalty =
        contract.penalty_demanded_by === contract.client;

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

        // 5. Client break after deadline without penalty
        // 6. Client break after deadline with penalty
        // 8. Terminated - Client charge penalty after deadline
        // 10. Terminated - Client not charge penalty after deadline
        if (isDeadlineExpired) {
            return (
                <ContractAlert
                    message={
                        <Space direction="vertical" size={12}>
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
