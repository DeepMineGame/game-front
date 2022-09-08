import { Progress } from 'antd';
import React from 'react';
import cn from 'classnames';
import styles from '../styles.module.scss';

function getPercentage(value: number, total: number) {
    return (value / total) * 100;
}
export type ProgressProps = {
    initial?: number;
    current?: number;
    remained?: number;
    rightContent?: React.ReactNode;
    className?: string;
};

export function NftProgressBar({
    current = 0,
    remained = 0,
    initial = 0,
    rightContent,
    className,
}: ProgressProps) {
    const currentProgress = getPercentage(current, remained);
    const disabledProgress = getPercentage(remained, initial);
    const info = () => (
        <div className={styles.info}>
            {current}/{remained}
            <div className={styles.rightContent}>
                {rightContent ?? <span>({initial})</span>}
            </div>
        </div>
    );
    return (
        <Progress
            className={cn(styles.progress, className)}
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
