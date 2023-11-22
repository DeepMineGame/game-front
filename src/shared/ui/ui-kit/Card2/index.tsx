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
import { AssetStruct } from 'entities/game-stat';
import { ProgressProps } from '../ProgressBar/NftProgressBar';
import styles from './styles.module.scss';
import { CardBadge } from './components/CardBadge';
import { CardState } from './components/CardState';

enum Status {
    installed = 'installed',
    broken = 'broken',
    notInstalled = 'notInstalled',
}

const getAssetStatus = (inventory?: AssetStruct): Status => {
    if (inventory?.broken) return Status.broken;
    if (inventory?.in_use) return Status.installed;

    return Status.notInstalled;
};

type CardProps = {
    tooltipOverlay?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    onClick?: (e: any) => void;
    className?: string;
    inventory?: AssetStruct;
    onRepairFinish?: () => void;
    withDepreciationBar?: boolean;
    showCardBadgeStatus: boolean;
} & ProgressProps;

export const Card2: FC<CardProps> = ({
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

    const templateId = inventory?.template_id || Number(inventory?.template_id);

    return (
        <Tooltip overlay={tooltipOverlay}>
            <div className={cn(styles.wrapper, className)}>
                <div onClick={onClick}>
                    {showCardBadgeStatus && <CardBadge status={status} />}

                    {inventory && (
                        <CardState
                            status={status}
                            onFinish={onRepairFinish}
                            card={inventory}
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
                            depreciation={inventory?.depreciation}
                            currentCapacity={inventory?.current_capacity}
                            maximalCapacity={inventory?.maximal_capacity}
                            rarity={inventory?.rarity}
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
