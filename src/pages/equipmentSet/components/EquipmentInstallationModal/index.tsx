import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DmpIcon, Modal, Timer, Title } from 'shared';
import Icon from '@ant-design/icons';
import styles from './styles.module.scss';

export const EquipmentInstallationModal = () => {
    const { t } = useTranslation();
    const [infoModalVisibility, setInfoModalVisibility] = useState(false);
    const toggleModal = () => setInfoModalVisibility(!infoModalVisibility);
    const [useDmp, setUseDmp] = useState(false);
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
            <Button type="primary">
                {t('components.common.button.install')}
            </Button>
        </div>
    );

    return (
        <>
            <Button
                type="primary"
                onClick={toggleModal}
                className={styles.actionButton}
                size="large"
            >
                {t('pages.install')}
            </Button>
            <Modal
                visible={infoModalVisibility}
                title={
                    <Title fontFamily="bai" level={5}>
                        {t('pages.installation')}
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
