import { Title } from 'shared';
import cn from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { serviceMarket } from 'app/router/paths';
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
            <Tooltip overlay="Coming soon" trigger="click">
                <div className={styles.hubBottom}>
                    <Title
                        level={5}
                        className={cn(styles.enterLink, styles.rentalHubTitle)}
                    >
                        {t('RENTAL HUB')}
                    </Title>
                </div>
            </Tooltip>
        </div>
    );
};
