import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionModal, Button } from 'shared';
import styles from './styles.module.scss';

interface Props {
    disabled?: boolean;
    isInstall?: boolean;
    onInstall?: () => Promise<void>;
    onUninstall?: () => Promise<void>;
}
export const EquipmentInstallationModal = ({
    disabled,
    onInstall,
    onUninstall,
    isInstall,
}: Props) => {
    const { t } = useTranslation();
    const [infoModalVisibility, setInfoModalVisibility] = useState(false);
    const toggleModal = () => setInfoModalVisibility(!infoModalVisibility);

    const handleInstall = async () => {
        if (onInstall) {
            await onInstall();
            toggleModal();
        }
    };

    const handleUninstall = async () => {
        if (onUninstall) {
            await onUninstall();
            toggleModal();
        }
    };

    return (
        <>
            <Button
                disabled={disabled}
                type="primary"
                onClick={toggleModal}
                className={styles.actionButton}
                size="large"
            >
                {isInstall
                    ? t('pages.equipmentSet.main.install')
                    : t('pages.equipmentSet.main.uninstall')}
            </Button>
            <ActionModal
                visible={infoModalVisibility}
                onCancel={toggleModal}
                onSubmit={isInstall ? handleInstall : handleUninstall}
                costs={{ timeSeconds: 1, coinAmount: 0 }}
                texts={{
                    title: t('pages.equipmentSet.main.installation'),
                    onOk: isInstall
                        ? t('components.common.button.install')
                        : t('components.common.button.uninstall'),
                }}
            />
        </>
    );
};
