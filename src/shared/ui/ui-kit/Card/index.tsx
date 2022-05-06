import React, { FC } from 'react';
import { Progress, Tooltip } from 'antd';
import { Logo } from 'shared';
import cutterImg from '../../images/cutter.png';
import styles from './styles.module.scss';

type Props = {
    imageSrc?: string;
    initialProgress: number;
    progressRemained: number;
    progressCurrent: number;
};

function getPercentage(value: number, total: number) {
    return (value / total) * 100;
}

export const Card: FC<Props> = ({
    imageSrc,
    initialProgress,
    progressCurrent,
    progressRemained,
}) => {
    const info = () => (
        <div className={styles.info}>
            {progressCurrent}/{progressRemained} ({initialProgress})
        </div>
    );
    const currentProgress = getPercentage(progressCurrent, progressRemained);
    const disabledProgress = getPercentage(progressRemained, initialProgress);
    const lvlTooltip = () => (
        <div className={styles.lvlTooltipContent}>
            <Logo />
            <div>120/9999</div>
        </div>
    );
    const neutral4 = '#303030';
    return (
        <Tooltip
            overlay={lvlTooltip}
            className={styles.tooltip}
            overlayClassName={styles.tooltipOverlay}
            placement="rightTop"
            color={neutral4}
        >
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <img
                        height="100%"
                        width="100%"
                        src={imageSrc || cutterImg}
                        alt="nft-equipment-card"
                    />
                </div>
                <Progress
                    className={styles.progress}
                    strokeColor="#1D1D1D"
                    percent={disabledProgress}
                    success={{
                        percent: currentProgress,
                        strokeColor: '#F5C913',
                    }}
                    format={info}
                />{' '}
            </div>
        </Tooltip>
    );
};
