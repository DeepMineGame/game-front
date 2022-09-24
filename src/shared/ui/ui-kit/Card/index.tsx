import { FC, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import cn from 'classnames';
import {
    Button,
    Logo,
    getImagePath,
    DepreciationProgressBar,
    neutral4,
} from 'shared';
import { UserInventoryType } from 'entities/smartcontract';
import { AssetDataType, getAtomicAssetsDataById } from 'entities/atomicassets';
import { ProgressProps } from '../ProgressBar/NftProgressBar';
import styles from './styles.module.scss';
import { CardBadge } from './components/CardBadge';
import { CardState } from './components/CardState';

export type Status = 'installed' | 'broken' | 'notInstalled';

export const getCardStatus = (inventory?: UserInventoryType): Status => {
    if (inventory?.broken) return 'broken';
    if (inventory?.in_use) return 'installed';

    return 'notInstalled';
};

type Props = {
    imageSrc?: string;
    needTooltip?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
    buttonClassName?: string;
    onClick?: (e: any) => void;
    className?: string;
    inventory?: UserInventoryType;
    repairFinishesAt?: number;
    onRepairFinish?: () => void;
    withDepreciationBar?: boolean;
    withStatus: boolean;
} & ProgressProps;

export const Card: FC<Props> = ({
    imageSrc,
    needTooltip,
    buttonText,
    onButtonClick,
    buttonClassName,
    onClick,
    className,
    inventory,
    repairFinishesAt,
    onRepairFinish,
    withStatus,
    withDepreciationBar = true,
}) => {
    const lvlTooltip = () => (
        <div className={styles.lvlTooltipContent}>
            <Logo />
            <div>120/9999</div>
        </div>
    );

    const [cardData, setCardData] = useState<AssetDataType | undefined>();

    useEffect(() => {
        (async () => {
            setCardData(await getAtomicAssetsDataById(inventory?.asset_id!));
        })();
    }, []);

    const status = getCardStatus(inventory);

    return (
        <Tooltip
            overlay={needTooltip ? lvlTooltip : undefined}
            placement="rightTop"
            color={neutral4}
        >
            <div className={cn(styles.wrapper, className)}>
                <div onClick={onClick}>
                    {withStatus && <CardBadge status={status} />}
                    {status === 'broken' && (
                        <CardState
                            status={status}
                            templateId={inventory?.template_id}
                            finishesAt={repairFinishesAt}
                            onFinish={onRepairFinish}
                        />
                    )}
                    <div
                        className={cn({
                            [styles.stateWrapper]: status === 'broken',
                        })}
                    >
                        <div
                            className={cn(styles.image, {
                                [styles.broken]: status === 'broken',
                                [styles.repairing]: !!repairFinishesAt,
                            })}
                        >
                            <img
                                height="100%"
                                width="100%"
                                src={
                                    inventory?.template_id
                                        ? getImagePath(inventory?.template_id)
                                        : imageSrc
                                }
                                alt="nft-equipment-card"
                            />
                        </div>
                        {withDepreciationBar && (
                            <DepreciationProgressBar
                                completedMining={cardData?.data.depreciation}
                                serviceLife={cardData?.data['current capacity']}
                                totalServiceLife={
                                    cardData?.data['maximal capacity']
                                }
                            />
                        )}
                    </div>
                </div>
                {buttonText && (
                    <Button
                        className={cn(styles.button, buttonClassName)}
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
