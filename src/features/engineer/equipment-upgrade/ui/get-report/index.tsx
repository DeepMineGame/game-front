import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import {
    ContractDto,
    LOCATION_TO_ID,
    upgradeFinish,
} from 'entities/smartcontract';
import { Button } from 'shared/ui/ui-kit';
import {
    useReloadPage,
    useTravelConfirm,
    useUserLocation,
} from 'shared/lib/hooks';
import { UpgradeReport } from 'shared/ui';

type Props = {
    accountName: string;
    contract: ContractDto;
};

const GetUpgrade: FC<Props> = ({ accountName, contract }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const inLocation = useUserLocation();
    const { travelConfirm } = useTravelConfirm(
        LOCATION_TO_ID.engineers_workshop
    );
    const signUpgradeFinish = useSmartContractAction({
        action: upgradeFinish(accountName, contract.id),
        onSignSuccess: reloadPage,
    });

    const finishUpgrade = async () => {
        await signUpgradeFinish();
    };

    const handleUpgradeFinish = () => {
        if (inLocation.engineersWorkshop) {
            finishUpgrade();
        } else {
            travelConfirm(reloadPage);
        }
    };

    if (!contract.deleted_at) {
        return (
            <Button
                block
                size="large"
                type="primary"
                onClick={handleUpgradeFinish}
            >
                {t('pages.engineer.getReport')}
            </Button>
        );
    }

    return <UpgradeReport contract={contract} accountName={accountName} />;
};

export { GetUpgrade };
