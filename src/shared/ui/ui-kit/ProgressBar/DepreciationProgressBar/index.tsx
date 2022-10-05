import { FC, memo } from 'react';
import { Progress } from 'antd';
import cn from 'classnames';
import { AssetDataType } from 'entities/atomicassets';
import styles from '../styles.module.scss';

type DepreciationProgressBarProps = {
    depreciation?: AssetDataType['data']['depreciation'];
    currentCapacity?: AssetDataType['data']['current capacity'];
    maximalCapacity?: AssetDataType['data']['maximal capacity'];
    className?: string;
};

export const DepreciationProgressBar: FC<DepreciationProgressBarProps> = memo(
    ({
        depreciation = 0,
        currentCapacity = 0,
        maximalCapacity = 0,
        className,
    }) => {
        const format = () => (
            <div className={styles.info}>
                {depreciation}/{currentCapacity} ({maximalCapacity})
            </div>
        );

        const amountOfMiningPercentage =
            100 - (Number(currentCapacity) / Number(maximalCapacity)) * 100;

        const step = 100 / Number(maximalCapacity);
        const amountOfStep = Number(depreciation);

        return (
            <Progress
                className={cn(styles.rootDeprecation, className)}
                percent={amountOfMiningPercentage}
                success={{
                    percent: amountOfMiningPercentage + step * amountOfStep,
                }}
                format={format}
            />
        );
    }
);
