import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { ContractDto, upgradeFinish } from 'entities/smartcontract';
import { Button } from 'shared/ui/ui-kit';
import { useAccountName, useReloadPage } from 'shared/lib/hooks';
import { UpgradeReport } from 'shared/ui';

type Props = {
    contract: ContractDto;
};

const GetUpgrade: FC<Props> = ({ contract }) => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const signUpgradeFinish = useSmartContractAction({
        action: upgradeFinish(accountName, contract.id),
        onSignSuccess: () => setTimeout(reloadPage, 1500),
    });

    const finishUpgrade = async () => {
        await signUpgradeFinish();
    };

    const handleUpgradeFinish = () => {
        finishUpgrade();
    };

    if (!contract.deleted_at) {
        return (
            <Button
                block
                size="large"
                type="primary"
                onClick={handleUpgradeFinish}
            >
                {t('pages.engineer.finishUpgrade')}
            </Button>
        );
    }

    return <UpgradeReport contract={contract} accountName={accountName} />;
};

export { GetUpgrade };
