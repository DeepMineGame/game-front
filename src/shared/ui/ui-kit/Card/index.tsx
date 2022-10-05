import { FC } from 'react';
import { Tooltip } from 'antd';
import cn from 'classnames';
import {
    Button,
    getImagePath,
    DepreciationProgressBar,
    isUtcDateExpired,
} from 'shared';
import { UserInventoryType } from 'entities/smartcontract';
import { InventoriedAssets } from 'entities/atomicassets';
import { ProgressProps } from '../ProgressBar/NftProgressBar';
import styles from './styles.module.scss';
import { CardBadge } from './components/CardBadge';
import { CardState } from './components/CardState';

export enum Status {
    installed = 'installed',
    broken = 'broken',
    notInstalled = 'notInstalled',
}

export const getCardStatus = (inventory?: UserInventoryType | any): Status => {
    if (inventory?.broken) return Status.broken;
    if (inventory?.in_use) return Status.installed;

    return Status.notInstalled;
};

export type CardProps = {
    tooltipOverlay?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    onClick?: (e: any) => void;
    className?: string;
    inventory?: InventoriedAssets[number] | UserInventoryType;
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
    const status = getCardStatus(inventory);

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
                            src={getImagePath(inventory?.template_id!)}
                            alt="nft-equipment-card"
                        />
                    </div>
                    {withDepreciationBar && (
                        <DepreciationProgressBar
                            depreciation={
                                (inventory as InventoriedAssets[number])?.data
                                    ?.depreciation
                            }
                            currentCapacity={
                                (inventory as InventoriedAssets[number])
                                    ?.data?.['current capacity']
                            }
                            maximalCapacity={
                                (inventory as InventoriedAssets[number])
                                    ?.data?.['maximal capacity']
                            }
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
