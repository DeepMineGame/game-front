import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { desktopS, getTimeLeft, Title, useMediaQuery } from 'shared';
import styles from './styles.module.scss';

type Props = {
    setIsMiningFinished: (value: boolean) => void;
    timeLeft?: number;
};

export const MiningInProgressTitle: FC<Props> = ({
    setIsMiningFinished,
    timeLeft,
}) => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const [seconds, setSeconds] = useState(timeLeft || 0);

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
            setIsMiningFinished(false);
        } else {
            setIsMiningFinished(true);
        }
    }, [seconds]);

    if (seconds) {
        return (
            <Title
                level={isDesktop ? 2 : 4}
                className={styles.title}
                fontFamily="orbitron"
            >
                {`${t('pages.mining.miningInProgress')}: ${getTimeLeft(
                    Math.round(seconds),
                    true
                )}`}
            </Title>
        );
    }

    return null;
};
