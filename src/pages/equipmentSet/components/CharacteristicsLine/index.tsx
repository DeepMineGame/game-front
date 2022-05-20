import React from 'react';
import styles from './styles.module.scss';

interface CharacteristicsLineProps {
    name: string;
    value: string | number;
}
export const CharacteristicsLine = ({
    name,
    value,
}: CharacteristicsLineProps) => {
    return (
        <div className={styles.line}>
            <div className={styles.lineName}>{name}</div>
            <div className={styles.lineValue}>{value}</div>
        </div>
    );
};
