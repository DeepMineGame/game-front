import { FC } from 'react';
import { Tooltip } from 'antd';
import cn from 'classnames';
import {
    Button,
    Logo,
    getImagePath,
    DepreciationProgressBar,
    neutral4,
} from 'shared';
import { InventoryIdType } from 'entities/smartcontract';
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
    templateId?: InventoryIdType;
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
    templateId,
    repairing,
}) => {
    const lvlTooltip = () => (
        <div className={styles.lvlTooltipContent}>
            <Logo />
            <div>120/9999</div>
        </div>
    );

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
                            templateId={templateId}
                            repairing={repairing}
                        />
                    )}
                    <div className={styles.stateWrapper}>
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
                                    templateId
                                        ? getImagePath(templateId)
                                        : imageSrc
                                }
                                alt="nft-equipment-card"
                            />
                        </div>
                        <DepreciationProgressBar
                            totalMining={25}
                            completedMining={4}
                            serviceLife={13}
                            totalServiceLife={20}
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
