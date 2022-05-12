import { Progress } from 'antd';
import React from 'react';
import styles from '../../styles.module.scss';

function getPercentage(value: number, total: number) {
    return (value / total) * 100;
}
export type ProgressProps = {
    initial?: number;
    current?: number;
    remained?: number;
};

export function NftProgressBar({
    current = 0,
    remained = 0,
    initial = 0,
}: ProgressProps) {
    const currentProgress = getPercentage(current, remained);
    const disabledProgress = getPercentage(remained, initial);
    const info = () => (
        <div className={styles.info}>
            {current}/{remained} ({initial})
        </div>
    );
    return (
        <Progress
            className={styles.progress}
            strokeColor="#1D1D1D"
            percent={disabledProgress}
            success={{
                percent: currentProgress,
                strokeColor: '#F5C913',
            }}
            format={info}
        />
    );
}
