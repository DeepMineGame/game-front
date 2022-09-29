import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useReloadPage } from 'shared';
import { useSmartContractAction } from 'features/hooks';
import { terminateContract } from 'entities/smartcontract';
import { Alert, Button } from 'shared/ui';

type Props = {
    accountName: string;
    contractId: number;
};

const Completed: FC<Props> = ({ accountName, contractId }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const terminateAction = useSmartContractAction({
        action: terminateContract(accountName, contractId, 0),
    });

    const handleComplete = async () => {
        await terminateAction();
        reloadPage();
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
