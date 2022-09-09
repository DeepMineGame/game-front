import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    desktopS,
    getTimeLeftFromUtc,
    Title,
    useMediaQuery,
    useTick,
} from 'shared';
import classNames from 'classnames';
import { ActionDto, ActionState } from 'entities/smartcontract';
import styles from './styles.module.scss';

type Props = {
    action: ActionDto;
    setIsMiningFinished: (value: boolean) => void;
};

export const MiningTitle: FC<Props> = memo(
    ({ action, setIsMiningFinished }) => {
        const { t } = useTranslation();
        const isDesktop = useMediaQuery(desktopS);
        const miningTitleMap = {
            [ActionState.active]: t('pages.mining.miningInProgress'),
            [ActionState.interrupted]: t('pages.mining.miningWasInterrupted'),
            [ActionState.finished]: t('pages.mining.miningHasFinished'),
            [ActionState.claimed]: t('pages.mining.miningHasClaimed'),
            [ActionState.undefined]: '',
            [ActionState.idle]: undefined,
        };

        const isFinished = new Date() > new Date(action.finishes_at * 1000);

        useEffect(() => {
            setIsMiningFinished(isFinished);
        }, [isFinished, setIsMiningFinished]);

        useTick(!isFinished);

        const state =
            isFinished && action.state !== ActionState.interrupted
                ? ActionState.finished
                : action.state;
        return (
            <Title
                level={isDesktop ? 2 : 4}
                className={classNames(styles.miningStatusTitle, {
                    [styles.interrupted]: state === ActionState.interrupted,
                    [styles.finished]:
                        isFinished && action.state !== ActionState.interrupted,
                })}
            >
                {miningTitleMap[state]}{' '}
                {!isFinished && getTimeLeftFromUtc(action.finishes_at, true)}
            </Title>
        );
    }
);
