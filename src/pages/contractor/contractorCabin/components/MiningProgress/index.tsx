import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Loader, useTick, isUtcDateExpired, getTimeLeftFromUtc } from 'shared';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

type MiningProgressProps = {
    finishesAt: number;
    onFinish: () => void;
};

export const MiningProgress = React.memo(
    ({ finishesAt, onFinish }: MiningProgressProps) => {
        useTick();
        const { t } = useTranslation();
        if (isUtcDateExpired(finishesAt)) onFinish();

        return (
            <div className={styles.container}>
                <div className={cn(contractorStyles.title, styles.title)}>
                    {t('pages.contractor.miningProgress.title')}
                </div>
                <div className={styles.timerContainer}>
                    <Loader size="small" />
                    <div className={styles.timer}>
                        {getTimeLeftFromUtc(finishesAt)}
                    </div>
                </div>
            </div>
        );
    }
);
