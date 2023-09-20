import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    desktopS,
    getTimeLeft,
    Title,
    useAccountName,
    useMediaQuery,
} from 'shared';
import { useGate, useStore } from 'effector-react';
import { $miningCountDown, MiningStatGate } from 'features';
import styles from './styles.module.scss';

type Props = {
    setIsMiningFinished: (value: boolean) => void;
};

export const MiningInProgressTitle: FC<Props> = ({ setIsMiningFinished }) => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    useGate(MiningStatGate, { accountName });
    const miningCountDown = useStore($miningCountDown);

    useEffect(() => {
        if (miningCountDown >= 0) {
            setIsMiningFinished(false);
        } else {
            setIsMiningFinished(true);
        }
    }, [miningCountDown, setIsMiningFinished]);

    if (miningCountDown) {
        return (
            <Title
                level={isDesktop ? 2 : 4}
                className={styles.title}
                fontFamily="orbitron"
            >
                {`${t('Mining in progress')}: ${getTimeLeft(
                    Math.round(miningCountDown),
                    true
                )}`}
            </Title>
        );
    }

    return null;
};
