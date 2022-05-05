import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Title } from 'shared';
import styles from './styles.module.scss';

export const EquipmentInstallationModal = () => {
    const { t } = useTranslation();
    const [infoModalVisibility, setInfoModalVisibility] = useState(false);
    const toggleModal = () => setInfoModalVisibility(!infoModalVisibility);

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
                title={t('pages.installation')}
                onCancel={toggleModal}
            >
                <Title level={5} fontFamily="bai">
                    This action will take:
                </Title>
            </Modal>
        </>
    );
};
