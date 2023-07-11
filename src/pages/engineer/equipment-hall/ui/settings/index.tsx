import { FC } from 'react';
import { useStore } from 'effector-react';
import cn from 'classnames';
import { SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';
import { useSmartContractAction } from 'features/hooks';
import { $engineerCabin } from 'entities/engineer';
import { clearEngineer, LOCATION_TO_ID } from 'entities/smartcontract';
import { Dropdown } from 'shared/ui/ui-kit';
import {
    useAccountName,
    useReloadPage,
    useTravelConfirm,
    useUserLocation,
} from 'shared/lib/hooks';
import styles from './styles.module.scss';

const EngineerSettings: FC<{ disabled: boolean }> = ({ disabled }) => {
    const { modal } = App.useApp();

    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const accountName = useAccountName();
    const inLocation = useUserLocation();
    const { travelConfirm } = useTravelConfirm(
        LOCATION_TO_ID.engineers_workshop
    );
    const { certificate } = useStore($engineerCabin);

    const onDismiss = useSmartContractAction({
        action: clearEngineer(accountName, certificate?.asset_id!),
        onSignSuccess: reloadPage,
    });

    const handleDismiss = async () => {
        await onDismiss();
    };

    const dismissConfirm = () => {
        modal.confirm({
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
                className={cn(styles.icon, styles.settingsIcon, {
                    [styles.disabled]: disabled,
                })}
            />
        </Dropdown>
    );
};

export { EngineerSettings };
