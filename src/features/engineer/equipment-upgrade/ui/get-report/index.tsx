import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { LOCATION_TO_ID, upgradeFinish } from 'entities/smartcontract';
import { Button } from 'shared/ui/ui-kit';
import {
    useReloadPage,
    useTravelConfirm,
    useUserLocation,
} from 'shared/lib/hooks';

type Props = {
    accountName: string;
    contractId: number;
};

const GetUpgrade: FC<Props> = ({ accountName, contractId }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const inLocation = useUserLocation();
    const { travelConfirm } = useTravelConfirm(
        LOCATION_TO_ID.engineers_workshop
    );
    const signUpgradeFinish = useSmartContractAction({
        action: upgradeFinish(accountName, contractId),
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

    return (
        <Button block size="large" type="primary" onClick={handleUpgradeFinish}>
            {t('pages.engineer.getReport')}
        </Button>
    );
};

export { GetUpgrade };
