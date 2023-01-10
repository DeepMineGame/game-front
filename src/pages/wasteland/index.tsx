import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { city, contractorCabin, mineOwner } from 'app/router/paths';
import { Header, Title, useUserLocation } from 'shared';
import cn from 'classnames';
import { UserLocator } from 'entities/user';
import styles from './styles.module.scss';

export const Wasteland = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isUserLocation = useUserLocation();

    return (
        <div className={styles.wasteland}>
            <div className={styles.hub} />
            <Header />
            <div className={styles.city} onClick={() => navigate(city)}>
                <Title
                    fontFamily="orbitron"
                    className={cn(styles.cityTitle, styles.enterLink)}
                    level={5}
                >
                    {t('pages.home.goToCity')}
                </Title>
            </div>
            <div
                className={styles.mineDeck}
                onClick={() => navigate(mineOwner)}
            >
                {isUserLocation.mineDeck && <UserLocator center />}
                <Title
                    fontFamily="orbitron"
                    className={cn(styles.mineDeckLink, styles.enterLink)}
                    level={5}
                >
                    {t('pages.home.mineDeck')}
                </Title>
            </div>
            <div
                className={styles.mine}
                onClick={() => navigate(contractorCabin)}
            >
                {isUserLocation.mine && <UserLocator center />}
                <Title
                    fontFamily="orbitron"
                    className={cn(styles.mineTitle, styles.enterLink)}
                    level={5}
                >
                    {t('components.common.mine.title').toUpperCase()}
                </Title>
            </div>
        </div>
    );
};
