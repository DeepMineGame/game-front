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
import { AssetDataType } from 'entities/atomicassets';
import { ProgressProps } from '../ProgressBar/NftProgressBar';
import styles from './styles.module.scss';
import { CardBadge } from './components/CardBadge';
import { CardState } from './components/CardState';

export enum Status {
    installed = 'installed',
    broken = 'broken',
    notInstalled = 'notInstalled',
}

export type CardProps = {
    tooltipOverlay?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    onClick?: (e: any) => void;
    className?: string;
    inventory?: UserInventoryType;
    onRepairFinish?: () => void;
    withDepreciationBar?: boolean;
    showCardBadgeStatus: boolean;
    cardData?: AssetDataType | null;
    status?: Status;
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
    cardData,
    status,
}) => (
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
                        completedMining={cardData?.data.depreciation}
                        serviceLife={cardData?.data['current capacity']}
                        totalServiceLife={cardData?.data['maximal capacity']}
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
