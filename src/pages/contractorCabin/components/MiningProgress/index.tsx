import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Loader, getTimeLeft } from 'shared';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

interface MiningProgressProps {
    msUntil: number;
}

export const MiningProgress = React.memo(({ msUntil }: MiningProgressProps) => {
    const { t } = useTranslation();
    const [currentMsUntil, setCurrentMsUntil] = useState(0);
    // eslint-disable-next-line no-undef
    const intervalId = useRef<NodeJS.Timer | undefined>();

    useEffect(() => {
        if (msUntil) {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = undefined;
                setCurrentMsUntil(msUntil);
            }

            intervalId.current = setInterval(() => {
                setCurrentMsUntil((v) => (v ? Math.max(v - 1000, 0) : msUntil));
            }, 1000);
        }

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [msUntil]);

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.miningProgress.title')}
            </div>
            <div className={styles.timerContainer}>
                <Loader size="small" />
                <div className={styles.timer}>
                    {getTimeLeft(currentMsUntil / 1000)}
                </div>
            </div>
        </div>
    );
});
