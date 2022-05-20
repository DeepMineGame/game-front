import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimer } from 'react-timer-hook';
import { desktopS, Title, useMediaQuery } from 'shared';
import classNames from 'classnames';
import { ActionDto, ActionState } from 'entities/smartcontracts';
import styles from './styles.module.scss';

type Props = {
    action: ActionDto;
    onMiningExpire?: () => void;
};

export const MiningTitle: FC<Props> = memo(({ action, onMiningExpire }) => {
    const { t } = useTranslation();

    const isDesktop = useMediaQuery(desktopS);
    const miningTitleMap = {
        [ActionState.active]: t('pages.mining.miningInProgress'),
        [ActionState.interrupted]: t('pages.mining.miningWasInterrupted'),
        [ActionState.finished]: t('pages.mining.miningHasFinished'),
        [ActionState.claimed]: t('pages.mining.miningHasClaimed'),
        [ActionState.undefined]: '',
    };
    const { seconds, minutes, hours, days } = useTimer({
        expiryTimestamp: new Date(action.finishes_at * 1000),
        onExpire: onMiningExpire,
    });

    const isMining = action?.state === ActionState.active;

    return (
        <Title
            level={isDesktop ? 2 : 4}
            className={classNames(styles.miningStatusTitle, {
                [styles.interrupted]: action.state === ActionState.interrupted,
                [styles.finished]: action.state === ActionState.finished,
            })}
            fontFamily="orbitron"
        >
            {miningTitleMap[action.state]}{' '}
            {isMining && (
                <>
                    {days}d{' '}
                    <span className={styles.timerRemained}>
                        {hours}:{minutes}:{seconds}
                    </span>
                </>
            )}
        </Title>
    );
});
