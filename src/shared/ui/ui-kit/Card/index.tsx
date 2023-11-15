import { FC } from 'react';
import { Tooltip } from 'antd';
import cn from 'classnames';
import {
    Button,
    getImagePath,
    DepreciationProgressBar,
    isUtcDateExpired,
} from 'shared';
import { ID_TO_INVENTORY, miningEquipmentNames } from 'entities/smartcontract';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import { ProgressProps } from '../ProgressBar/NftProgressBar';
import styles from './styles.module.scss';
import { CardBadge } from './components/CardBadge';
import { CardState } from './components/CardState';
import { AssetStruct } from '../../../../entities';

export enum Status {
    installed = 'installed',
    broken = 'broken',
    notInstalled = 'notInstalled',
}

export const getAssetStatus = (
    inventory?: MergedInventoryWithAtomicAssets[number] | AssetStruct
): Status => {
    if ('data' in (inventory || {})) {
        if (
            (inventory as MergedInventoryWithAtomicAssets[number])?.data?.broken
        )
            return Status.broken;
    }
    if ((inventory as AssetStruct).broken) {
        return Status.broken;
    }
    if (inventory?.in_use) return Status.installed;

    return Status.notInstalled;
};

export type CardProps = {
    tooltipOverlay?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    onClick?: (e: any) => void;
    className?: string;
    inventory?: MergedInventoryWithAtomicAssets[number];
    onRepairFinish?: () => void;
    withDepreciationBar?: boolean;
    showCardBadgeStatus: boolean;
} & ProgressProps;

export const Card: FC<CardProps> = ({
    tooltipOverlay,
    buttonText,
    onButtonClick,
    onClick,
    className,
    inventory,
    onRepairFinish,
    showCardBadgeStatus,
    withDepreciationBar = true,
}) => {
    const status = getAssetStatus(inventory);
    const isEquipment =
        inventory &&
        miningEquipmentNames.includes(ID_TO_INVENTORY[inventory.template_id]);

    const templateId =
        inventory?.template_id || Number(inventory?.template.template_id);

    return (
        <Tooltip overlay={tooltipOverlay}>
            <div className={cn(styles.wrapper, className)}>
                <div onClick={onClick}>
                    {showCardBadgeStatus && <CardBadge status={status} />}
                    {(status === Status.broken ||
                        (!!inventory?.available_from &&
                            !isUtcDateExpired(inventory?.available_from))) && (
                        <CardState
                            status={status}
                            finishesAt={inventory?.available_from!}
                            onFinish={onRepairFinish}
                        />
                    )}
                    <div className={styles.image}>
                        <img
                            height="100%"
                            width="100%"
                            src={templateId ? getImagePath(templateId) : ''}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = '/img/no-image.webp';
                            }}
                            alt={`template ${inventory?.template_id || ''}`}
                        />
                    </div>
                    {isEquipment && withDepreciationBar && (
                        <DepreciationProgressBar
                            depreciation={
                                (
                                    inventory as MergedInventoryWithAtomicAssets[number]
                                )?.data?.depreciation
                            }
                            currentCapacity={
                                (
                                    inventory as MergedInventoryWithAtomicAssets[number]
                                )?.data?.['current capacity']
                            }
                            maximalCapacity={
                                (
                                    inventory as MergedInventoryWithAtomicAssets[number]
                                )?.data?.['maximal capacity']
                            }
                            rarity={inventory?.data.rarity}
                        />
                    )}
                </div>
                {buttonText && (
                    <Button
                        className={styles.button}
                        size="large"
                        type="link"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
        </Tooltip>
    );
};
