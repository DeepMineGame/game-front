import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { Logo } from 'shared';
import cutterImg from '../../images/cutter.png';
import styles from './styles.module.scss';
import { CardBadge } from './components/CardBadge';
import { NftProgressBar, ProgressProps } from './components/NftProgressBar';

export type Status = 'installed' | 'broken' | 'notInstalled';

type Props = {
    imageSrc?: string;
    status?: Status;
} & ProgressProps;

export const Card: FC<Props> = ({
    imageSrc,
    initial,
    current,
    remained,
    status,
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
        <Tooltip overlay={lvlTooltip} placement="rightTop" color={neutral4}>
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
            </div>
        </Tooltip>
    );
};
