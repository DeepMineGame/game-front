import { FC, memo } from 'react';
import { Progress, Tooltip } from 'antd';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { AssetDataType } from 'entities/atomicassets';
import styles from '../styles.module.scss';
import { neutral3Color, primary6 } from '../../../variables';

type DepreciationProgressBarProps = {
    depreciation?: AssetDataType['data']['depreciation'];
    currentCapacity?: AssetDataType['data']['current capacity'];
    maximalCapacity?: AssetDataType['data']['maximal capacity'];
    className?: string;
    rarity: AssetDataType['data']['rarity'] | undefined;
};

export const DepreciationProgressBar: FC<DepreciationProgressBarProps> = memo(
    ({
        depreciation = 0,
        currentCapacity = 0,
        maximalCapacity = 0,
        className,
        rarity,
    }) => {
        const format = () => (
            <div className={styles.info}>
                {depreciation}/{currentCapacity} ({maximalCapacity})
            </div>
        );
        const { t } = useTranslation();

        const amountOfMiningPercentage =
            100 - (Number(currentCapacity) / Number(maximalCapacity)) * 100;

        const step = 100 / Number(maximalCapacity);
        const amountOfStep = Number(depreciation);

        return (
            <Tooltip overlay={t('components.depreciationBar.tooltip')}>
                <Progress
                    className={cn(
                        styles.rootDeprecation,
                        styles[rarity || ''],
                        className
                    )}
                    percent={amountOfMiningPercentage}
                    success={{
                        percent: amountOfMiningPercentage + step * amountOfStep,
                    }}
                    format={format}
                    strokeColor={primary6}
                    trailColor={neutral3Color}
                />
            </Tooltip>
        );
    }
);
