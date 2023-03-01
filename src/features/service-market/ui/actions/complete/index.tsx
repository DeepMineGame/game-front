import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useReloadPage } from 'shared';
import { useSmartContractAction } from 'features/hooks';
import { terminateContract } from 'entities/smartcontract';
import { Alert, Button } from 'shared/ui';

type Props = {
    accountName: string;
    contractId: number;
    onComplete?: () => Promise<void>;
};

const Completed: FC<Props> = ({ accountName, contractId, onComplete }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const terminateAction = useSmartContractAction({
        action: terminateContract(accountName, contractId),
        onSignSuccess: reloadPage,
    });

    const handleComplete = async () => {
        if (onComplete) {
            await onComplete();
        } else {
            await terminateAction();
        }
    };

    return (
        <Alert
            message={t(
                'pages.serviceMarket.contract.completeContractDescription'
            )}
            action={
                <Button ghost type="primary" onClick={handleComplete}>
                    {t('pages.serviceMarket.contract.completeContract')}
                </Button>
            }
            type="info"
            showIcon
        />
    );
};

export { Completed };
