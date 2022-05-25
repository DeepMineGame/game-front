import React, { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTimer } from 'react-timer-hook';
import { desktopS, Title, useMediaQuery } from 'shared';
import classNames from 'classnames';
import { ActionDto, ActionState } from 'entities/smartcontract';
import styles from './styles.module.scss';

type Props = {
    action: ActionDto;
    onMiningExpire?: (date: Date) => void;
    isMiningWillEndInFuture: boolean;
};

export const MiningTitle: FC<Props> = memo(
    ({ action, onMiningExpire, isMiningWillEndInFuture }) => {
        const { t } = useTranslation();
        const isDesktop = useMediaQuery(desktopS);
        const miningTitleMap = {
            [ActionState.active]: t('pages.mining.miningInProgress'),
            [ActionState.interrupted]: t('pages.mining.miningWasInterrupted'),
            [ActionState.finished]: t('pages.mining.miningHasFinished'),
            [ActionState.claimed]: t('pages.mining.miningHasClaimed'),
            [ActionState.undefined]: '',
        };
        const isMining =
            action?.state === ActionState.active && isMiningWillEndInFuture;

        // TODO: отказаться от этого пакета в пользу time.ts из utils
        const {
            seconds,
            minutes,
            hours,
            days,
            restart: timerRestart,
        } = useTimer({
            expiryTimestamp: new Date(action.finishes_at * 1000),
            onExpire: () => {
                if (onMiningExpire) {
                    onMiningExpire(new Date());
                }
            },
        });
        useEffect(() => {
            timerRestart(new Date(action.finishes_at * 1000), true);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isMining]);

        const isMiningFinished =
            (action?.state === ActionState.active &&
                !isMiningWillEndInFuture) ||
            action?.state === ActionState.finished;

        return (
            <Title
                level={isDesktop ? 2 : 4}
                className={classNames(styles.miningStatusTitle, {
                    [styles.interrupted]:
                        action.state === ActionState.interrupted,
                    [styles.finished]: isMiningFinished,
                })}
                fontFamily="orbitron"
            >
                {isMiningFinished
                    ? miningTitleMap[ActionState.finished]
                    : miningTitleMap[action.state]}{' '}
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
    }
);
