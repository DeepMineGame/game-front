import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DmpIcon, Modal, Timer, Title } from 'shared';
import Icon from '@ant-design/icons';
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
    const [useDmp, setUseDmp] = useState(false);

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

    const footer = (
        <div className={styles.modalFooter}>
            <Button
                type="ghost"
                icon={<Icon component={DmpIcon} />}
                className={styles.dmpButton}
                onClick={() => setUseDmp(!useDmp)}
            >
                22
            </Button>
            <Button type="ghost">{t('components.common.button.cancel')}</Button>
            {isInstall ? (
                <Button type="primary" onClick={handleInstall}>
                    {t('components.common.button.install')}
                </Button>
            ) : (
                <Button type="primary" onClick={handleUninstall}>
                    {t('components.common.button.uninstall')}
                </Button>
            )}
        </div>
    );

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
            <Modal
                visible={infoModalVisibility}
                title={
                    <Title fontFamily="bai" level={5}>
                        {t('pages.equipmentSet.main.installation')}
                    </Title>
                }
                onCancel={toggleModal}
                footer={footer}
            >
                <Title level={5} fontFamily="bai" thin>
                    {t('pages.contractor.travel.contentTitle')}
                </Title>
                <div>
                    {!useDmp && <Timer timeSeconds={100} energy={500} />}
                    {useDmp && (
                        <div className={styles.infoCard}>
                            <Icon component={DmpIcon} />
                            <div>DMP</div>
                            <div className={styles.infoCardValue}>22</div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};
