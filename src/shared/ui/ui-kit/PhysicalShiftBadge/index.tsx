import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

interface SignContractProps {
    onClose?: () => void;
    onClick: () => void;
}

export const PhysicalShiftBadge = ({ onClick, onClose }: SignContractProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            {onClose && (
                <CloseOutlined className={styles.close} onClick={onClose} />
            )}
            <div className={styles.text}>
                {t('pages.contractor.physicalShiftBadge.text')}
            </div>
            <div className={styles.button} onClick={onClick}>
                {t('pages.contractor.physicalShiftBadge.button')}
            </div>
        </div>
    );
};
