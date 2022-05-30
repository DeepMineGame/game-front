import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Timer } from 'shared';
import styles from './styles.module.scss';

interface SignContractProps {
    onClose: () => void;
    onClick: () => void;
    visible: boolean;
}

export const TravelModal = ({
    onClick,
    onClose,
    visible,
}: SignContractProps) => {
    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            wrapClassName={styles.wrapper}
            closable={false}
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {t('pages.contractor.travel.title')}
                    </div>
                    <CloseOutlined className={styles.close} />
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>
                        {t('pages.contractor.travel.contentTitle')}
                    </div>
                    <Timer timeSeconds={60 * 15} energy={30} />
                </div>
                <div className={styles.actions}>
                    <div className={styles.buttons}>
                        <div className={styles.cancelButton} onClick={onClose}>
                            {t('pages.contractor.travel.cancel')}
                        </div>
                        <div className={styles.travelButton} onClick={onClick}>
                            {t('pages.contractor.travel.travel')}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
