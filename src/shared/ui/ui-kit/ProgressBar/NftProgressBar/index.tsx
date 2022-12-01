import { Progress, Tooltip } from 'antd';
import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { neutral3Color, primary6 } from 'shared/ui/variables';
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
    const { t } = useTranslation();
    const info = () => (
        <div className={styles.info}>
            {current}/
            <Tooltip overlay={t('components.levelUpgradeBar.tooltip')}>
                {remained}
            </Tooltip>
            <div className={styles.rightContent}>
                {rightContent ?? <span>({initial})</span>}
            </div>
        </div>
    );
    return (
        <Progress
            className={cn(styles.progress, className)}
            strokeColor={neutral3Color}
            percent={disabledProgress}
            success={{
                percent: currentProgress,
                strokeColor: primary6,
            }}
            format={info}
        />
    );
}
