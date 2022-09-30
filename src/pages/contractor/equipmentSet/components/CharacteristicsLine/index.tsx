import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface CharacteristicsLineProps {
    name: string;
    value?: string | number;
}
export const CharacteristicsLine = ({
    name,
    value,
}: CharacteristicsLineProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.line}>
            <div className={styles.lineName}>{name}</div>
            <div className={styles.lineValue}>
                {value ?? t('components.common.comingSoon')}
            </div>
        </div>
    );
};
