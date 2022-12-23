import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { upgradeTerm } from 'entities/smartcontract';
import { useReloadPage } from 'shared/lib/hooks';
import { Button } from 'shared/ui/ui-kit';

type Props = {
    accountName: string;
    contractId: number;
};

export const UpgradeTerminate: FC<Props> = ({ accountName, contractId }) => {
    const { t } = useTranslation();

    const reloadPage = useReloadPage();

    const handleUpgradeTerminate = useSmartContractAction({
        action: upgradeTerm(accountName, contractId),
        onSignSuccess: reloadPage,
    });

    const stopUpgrade = async () => {
        await handleUpgradeTerminate();
    };

    return (
        <Button block size="large" type="primary" onClick={stopUpgrade}>
            {t('pages.engineer.stopUpgrade')}
        </Button>
    );
};
