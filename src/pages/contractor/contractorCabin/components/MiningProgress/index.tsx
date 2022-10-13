import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Loader, useTick, isUtcDateExpired, getTimeLeftFromUtc } from 'shared';
import { $activeMining, setMiningOverEvent } from 'features';
import { useEvent, useStore } from 'effector-react';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export const MiningProgress: FC = memo(() => {
    useTick();
    const { t } = useTranslation();
    const setMiningOver = useEvent(setMiningOverEvent);
    const activeMining = useStore($activeMining);
    const finishesAt = activeMining[0].finishes_at;

    if (isUtcDateExpired(finishesAt)) setMiningOver(true);

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
});
