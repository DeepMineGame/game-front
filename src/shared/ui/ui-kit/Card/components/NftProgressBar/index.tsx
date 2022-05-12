import { Progress } from 'antd';
import React from 'react';
import styles from '../../styles.module.scss';

function getPercentage(value: number, total: number) {
    return (value / total) * 100;
}
export type ProgressProps = {
    initialProgress?: number;
    progressCurrent?: number;
    progressRemained?: number;
};

export function NftProgressBar({
    progressCurrent = 0,
    progressRemained = 0,
    initialProgress = 0,
}: ProgressProps) {
    const currentProgress = getPercentage(progressCurrent, progressRemained);
    const disabledProgress = getPercentage(progressRemained, initialProgress);
    const info = () => (
        <div className={styles.info}>
            {progressCurrent}/{progressRemained} ({initialProgress})
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
