import { FC, memo } from 'react';
import { Progress } from 'antd';
import cn from 'classnames';
import styles from '../styles.module.scss';

type DepreciationProgressBarProps = {
    completedMining: number;
    totalMining: number;
    serviceLife: number;
    totalServiceLife: number;
    className?: string;
};

export const DepreciationProgressBar: FC<DepreciationProgressBarProps> = memo(
    ({
        serviceLife,
        completedMining,
        totalMining,
        totalServiceLife,
        className,
    }) => {
        const format = () => (
            <div className={styles.info}>
                {completedMining}/{serviceLife} ({totalServiceLife})
            </div>
        );

        return (
            <Progress
                className={cn(styles.rootDeprecation, className)}
                percent={(completedMining / totalMining) * 100}
                success={{ percent: (serviceLife / totalServiceLife) * 100 }}
                format={format}
            />
        );
    }
);
