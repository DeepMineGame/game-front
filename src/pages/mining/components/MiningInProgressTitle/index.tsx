import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    desktopS,
    getTimeLeftFromUtc,
    Title,
    useMediaQuery,
    useTick,
} from 'shared';
import { ActionDto } from 'entities/smartcontract';
import styles from './styles.module.scss';

type Props = {
    action: ActionDto;
    setIsMiningFinished: (value: boolean) => void;
};

export const MiningInProgressTitle: FC<Props> = memo(
    ({ action, setIsMiningFinished }) => {
        const { t } = useTranslation();
        const isDesktop = useMediaQuery(desktopS);

        const isFinished = Date.now() > action.finishes_at * 1000;

        useEffect(() => {
            setIsMiningFinished(isFinished);
        }, [isFinished, setIsMiningFinished]);

        useTick(!isFinished);

        return (
            <Title
                level={isDesktop ? 2 : 4}
                className={styles.title}
                fontFamily="orbitron"
            >
                {`${t('pages.mining.miningInProgress')}: ${getTimeLeftFromUtc(
                    action.finishes_at,
                    true
                )}`}
            </Title>
        );
    }
);
