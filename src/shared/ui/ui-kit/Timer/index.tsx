import React, { FC } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { EnergyIcon, TimerIcon } from '../../icons';
import { getTimeLeft } from '../../utils/time';
import styles from './index.module.scss';

type Props = {
    timeSeconds: number;
    energy: number;
    className?: string;
};

export const Timer: FC<Props> = ({ timeSeconds, energy, className }) => {
    const { t } = useTranslation();

    return (
        <div className={cn(styles.timer, className)}>
            <div className={styles.line}>
                <TimerIcon className={styles.icon} />
                <div className={styles.lineContent}>
                    <div className={styles.lineText}>{t('kit.timer.time')}</div>
                    <div className={styles.lineValue}>
                        {getTimeLeft(timeSeconds, true)}
                    </div>
                </div>
            </div>
            <div className={styles.line}>
                <EnergyIcon className={styles.icon} />
                <div className={styles.lineContent}>
                    <div className={styles.lineText}>
                        {t('kit.timer.energy')}
                    </div>
                    <div className={styles.lineValue}>{energy}</div>
                </div>
            </div>
        </div>
    );
};
