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

type Props = {
    imageSrc?: string;
    status?: Status;
    needTooltip?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
    buttonClassName?: string;
    onClick?: (e: any) => void;
    className?: string;
    inventory?: UserInventoryType;
    repairing?: boolean;
} & ProgressProps;

export const Card: FC<Props> = ({
    imageSrc,
    status,
    needTooltip,
    buttonText,
    onButtonClick,
    buttonClassName,
    onClick,
    className,
    inventory,
    repairing,
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

    return (
        <Tooltip
            overlay={needTooltip ? lvlTooltip : undefined}
            placement="rightTop"
            color={neutral4}
        >
            <div className={cn(styles.wrapper, className)}>
                <div onClick={onClick}>
                    <CardBadge status={status} />
                    {status === 'broken' && (
                        <CardState
                            status={status}
                            templateId={inventory?.template_id}
                            repairing={repairing}
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
                                [styles.repairing]: repairing,
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
                        <DepreciationProgressBar
                            completedMining={cardData?.data.depreciation}
                            serviceLife={cardData?.data['current capacity']}
                            totalServiceLife={
                                cardData?.data['maximal capacity']
                            }
                        />
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
