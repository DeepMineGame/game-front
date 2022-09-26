import { FC, memo } from 'react';
import { Progress } from 'antd';
import cn from 'classnames';
import { AssetDataType } from 'entities/atomicassets';
import styles from '../styles.module.scss';

type DepreciationProgressBarProps = {
    completedMining?: AssetDataType['data']['depreciation'];
    serviceLife?: AssetDataType['data']['current capacity'];
    totalServiceLife?: AssetDataType['data']['maximal capacity'];
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
                percent={
                    (Number(completedMining) / Number(totalServiceLife)) * 100
                }
                success={{
                    percent:
                        (Number(serviceLife) / Number(totalServiceLife)) * 100,
                }}
                format={format}
            />
        );
    }
);
