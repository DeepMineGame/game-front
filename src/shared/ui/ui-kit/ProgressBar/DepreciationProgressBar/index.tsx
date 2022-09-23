import { FC, memo } from 'react';
import { Progress } from 'antd';
import cn from 'classnames';
import styles from '../styles.module.scss';

type DepreciationProgressBarProps = {
    completedMining?: number;
    serviceLife?: number;
    totalServiceLife?: number;
    className?: string;
};

export const DepreciationProgressBar: FC<DepreciationProgressBarProps> = memo(
    ({
        serviceLife = 0,
        completedMining = 0,
        totalServiceLife = 0,
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
                percent={(completedMining / totalServiceLife) * 100}
                success={{ percent: (serviceLife / totalServiceLife) * 100 }}
                format={format}
            />
        );
    }
);
