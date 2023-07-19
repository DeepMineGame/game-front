import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { App } from 'antd';
import { useSmartContractAction } from 'features/hooks';
import { LOCATION_TO_ID, upgradeStart } from 'entities/smartcontract';
import { Button } from 'shared/ui/ui-kit';
import { neutral9 } from 'shared/ui/variables';
import {
    useReloadPage,
    useTravelConfirm,
    useUserLocation,
} from 'shared/lib/hooks';

type Props = {
    disabled: boolean;
    improved: boolean;
    accountName: string;
    contractId: number;
};

const PerformUpgrade: FC<Props> = ({
    disabled,
    accountName,
    contractId,
    improved,
}) => {
    const { modal } = App.useApp();

    const { t } = useTranslation();
    const inLocation = useUserLocation();
    const { travelConfirm } = useTravelConfirm(
        LOCATION_TO_ID.engineers_workshop
    );
    const reloadPage = useReloadPage();

    const handleUpgradeStart = useSmartContractAction({
        action: upgradeStart(accountName, contractId, improved),
        onSignSuccess: reloadPage,
    });

    const startUpgrade = async () => {
        await handleUpgradeStart();
    };

    const performConfirm = () => {
        modal.confirm({
            title: t('pages.engineer.areYouSureToPerformUpgrade'),
            icon: <ExclamationCircleOutlined style={{ color: neutral9 }} />,
            okText: t('pages.engineer.performUpgrade'),
            onOk: () => {
                startUpgrade();
            },
        });
    };

    const handlePerform = () => {
        if (inLocation.engineersWorkshop) {
            performConfirm();
        } else {
            travelConfirm();
        }
    };

    return (
        <Button
            block
            size="large"
            type="primary"
            onClick={handlePerform}
            disabled={disabled}
        >
            {t('pages.engineer.performUpgrade')}
        </Button>
    );
};

export { PerformUpgrade };
