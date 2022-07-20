import React, { useState, useEffect, useRef, FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import {
    desktopS,
    getTimeLeft,
    Loader,
    msToSeconds,
    useMediaQuery,
} from 'shared';
import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
    msUntil: number;
}

export const Searching: FC<Props> = ({ className, msUntil }) => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
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
        <div className={className}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.searching')}
            </div>
            <div className={styles.timerContainer}>
                <Loader size={isDesktop ? 'semiSmall' : 'small'} />
                <div className={styles.timer}>
                    {getTimeLeft(msToSeconds(currentMsUntil))}
                </div>
            </div>
        </div>
    );
};
