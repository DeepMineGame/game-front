import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { terminateContract, upgradeFinish } from 'entities/smartcontract';
import { ContractAlert, Button } from 'shared/ui';
import { useReloadPage } from 'shared/lib/hooks';
import { useLevelUpgradeContract } from '../constants';
import { CompletedAlert } from '../../../ui/actions';
import { ContractProps } from '../../../types';

export const ContractAlerts: FC<ContractProps> = ({
    contract,
    accountName,
}) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const terminateContractAction = useSmartContractAction({
        action: terminateContract(accountName, contract.id),
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

    const { showComplete, isEngineer, isDeadlineExpired, isWaitingForAction } =
        useLevelUpgradeContract(contract, accountName);

    if (isEngineer) {
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

    // 11. Complete by Engineer
    // 12. Complete by Client
    // 13. Upgrade Complete
    if (showComplete) {
        return (
            <CompletedAlert
                accountName={accountName}
                contractId={contract.id}
                onComplete={completeUpgrade}
            />
        );
    }

    return null;
};
