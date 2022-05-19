import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { Button, DMECoinIcon, Logo } from 'shared';
import cutterImg from '../../images/cutter.png';
import styles from './styles.module.scss';
import { CardBadge } from './components/CardBadge';
import { NftProgressBar, ProgressProps } from './components/NftProgressBar';

export type Status = 'installed' | 'broken' | 'notInstalled';

type Props = {
    imageSrc?: string;
    status?: Status;
    needTooltip?: boolean;
    hasRemove?: boolean;
    onRemove?: () => void;
} & ProgressProps;

export const Card: FC<Props> = ({
    imageSrc,
    initial,
    current,
    remained,
    status,
    needTooltip,
    hasRemove,
    onRemove,
}) => {
    const lvlTooltip = () => (
        <div className={styles.lvlTooltipContent}>
            <Logo />
            <div>120/9999</div>
        </div>
    );
    const neutral4 = '#303030';
    const hasProgress = initial || current || remained;

    return (
        <Tooltip
            overlay={needTooltip ? lvlTooltip : undefined}
            placement="rightTop"
            color={neutral4}
        >
            <div className={styles.wrapper}>
                <CardBadge status={status} />
                <div className={styles.image}>
                    <img
                        height="100%"
                        width="100%"
                        src={imageSrc || cutterImg}
                        alt="nft-equipment-card"
                    />
                </div>
                {hasProgress && (
                    <NftProgressBar
                        initial={initial}
                        current={current}
                        remained={remained}
                    />
                )}
                <NftProgressBar
                    initial={30}
                    current={30}
                    remained={120}
                    rightContent={<DMECoinIcon />}
                />
                {hasRemove && (
                    <Button
                        className={styles.removeButton}
                        size="large"
                        type="link"
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                )}
            </div>
        </Tooltip>
    );
};
