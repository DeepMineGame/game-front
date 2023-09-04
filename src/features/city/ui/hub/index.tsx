import { Title } from 'shared';
import cn from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { rentalHub, serviceMarket } from 'app/router/paths';
import styles from './styles.module.scss';

export const Hub = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className={styles.hubBase}>
            <div
                className={styles.hubTop}
                onClick={() => navigate(serviceMarket)}
            >
                <Title
                    level={5}
                    className={cn(styles.enterLink, styles.serviceMarketTitle)}
                >
                    {t('SERVICE MARKET')}
                </Title>
            </div>
            <div
                className={styles.hubBottom}
                onClick={() => navigate(rentalHub)}
            >
                <Title
                    level={5}
                    className={cn(styles.enterLink, styles.rentalHubTitle)}
                >
                    {t('RENTAL HUB')}
                </Title>
            </div>
        </div>
    );
};
