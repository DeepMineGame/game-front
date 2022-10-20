import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { upgradeFinish } from 'entities/smartcontract';
import { Button } from 'shared/ui/ui-kit';
import { useReloadPage } from 'shared/lib/hooks';

type Props = {
    accountName: string;
    contractId: number;
};

const GetReport: FC<Props> = ({ accountName, contractId }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const signUpgradeFinish = useSmartContractAction({
        action: upgradeFinish(accountName, contractId),
        onSignSuccess: reloadPage,
    });

    const completeUpgrade = async () => {
        await signUpgradeFinish();
    };

    return (
        <Button onClick={completeUpgrade} block type="primary">
            {t('pages.engineer.getReport')}
        </Button>
    );
};

export { GetReport };
