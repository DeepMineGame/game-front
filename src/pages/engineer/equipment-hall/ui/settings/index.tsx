import { FC } from 'react';
import { useStore } from 'effector-react';
import cn from 'classnames';
import { SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { $engineerCabinStore } from 'entities/engineer';
import {
    clearEngineer,
    LOCATION_TO_ID,
    physicalShift,
} from 'entities/smartcontract';
import { confirm, Dropdown } from 'shared/ui/ui-kit';
import {
    useAccountName,
    useReloadPage,
    useTravelConfirm,
    useUserLocation,
} from 'shared/lib/hooks';
import styles from './styles.module.scss';

export const useEngineerTravel = (onSuccess?: () => void) => {
    const accountName = useAccountName();

    const travelToWorkshop = useSmartContractAction({
        action: physicalShift(accountName, LOCATION_TO_ID.engineers_workshop),
        onSignSuccess: onSuccess,
    });

    const handleTravel = async () => {
        await travelToWorkshop();
    };

    return { handleTravel };
};

const EngineerSettings: FC<{ disabled: boolean }> = ({ disabled }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const accountName = useAccountName();
    const inLocation = useUserLocation();
    const { travelConfirm } = useTravelConfirm(
        LOCATION_TO_ID.engineers_workshop
    );
    const { certificate } = useStore($engineerCabinStore);

    const onDismiss = useSmartContractAction({
        action: clearEngineer(accountName, certificate?.asset_id!),
        onSignSuccess: reloadPage,
    });

    const handleDismiss = async () => {
        await onDismiss();
    };

    const dismissConfirm = () => {
        confirm({
            title: t('pages.engineer.dismissRole.title'),
            content: t('pages.engineer.dismissRole.content'),
            icon: <ExclamationCircleOutlined className={styles.icon} />,
            okText: t('pages.engineer.dismissRole.dismiss'),
            onOk: () => {
                handleDismiss();
            },
        });
    };

    const handleDismissClick = () => {
        if (inLocation.engineersWorkshop) {
            dismissConfirm();
        } else {
            travelConfirm(dismissConfirm);
        }
    };

    return (
        <Dropdown
            disabled={disabled}
            placement="bottomRight"
            items={[
                {
                    label: t('pages.engineer.dismissRole.dismiss'),
                    onClick: handleDismissClick,
                    key: 'dismiss',
                },
            ]}
        >
            <SettingOutlined
                className={cn(styles.icon, { [styles.disabled]: disabled })}
            />
        </Dropdown>
    );
};

export { EngineerSettings };
