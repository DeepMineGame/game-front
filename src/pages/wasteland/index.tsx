import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { city, contractorCabin, mineOwner } from 'app/router/paths';
import { Title } from 'shared';
import cn from 'classnames';
import styles from './styles.module.scss';

export const Wasteland = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={styles.wasteland}>
            <div className={styles.hub} />
            <div className={styles.city} onClick={() => navigate(city)}>
                <Title
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
                <Title
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
                <Title
                    className={cn(styles.mineTitle, styles.enterLink)}
                    level={5}
                >
                    {t('components.common.mine.title').toUpperCase()}
                </Title>
            </div>
        </div>
    );
};
