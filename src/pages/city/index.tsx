import React, { FC } from 'react';
import { Header, Title, useUserLocation } from 'shared';
import { useNavigate } from 'react-router-dom';
import {
    hive,
    landLord,
    serviceMarket,
    wasteland,
    engineer,
} from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import cn from 'classnames';
import { StarterPackNotifier, StarterPackOfferModal } from 'features';
import { UserLocator } from 'entities/user';
import styles from './styles.module.scss';

export const CityPage: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isUserLocation = useUserLocation();

    return (
        <div className={styles.homeScreen}>
            <Header />
            <div onClick={() => navigate(wasteland)} className={styles.mine}>
                <Title level={5} className={styles.mineOwnerTitle}>
                    {t('pages.home.mineOwnerCabin')}
                </Title>
                {(isUserLocation.mine || isUserLocation.mineDeck) && (
                    <UserLocator center />
                )}
            </div>
            <Space>
                <div className={styles.hive} onClick={() => navigate(hive)}>
                    {isUserLocation.hive && <UserLocator />}
                    <Title className={styles.enterLink} level={5}>
                        {t('pages.home.hive')}
                    </Title>
                </div>
                <div
                    className={styles.landlordLounge}
                    onClick={() => navigate(landLord)}
                >
                    {isUserLocation.landlordReception && <UserLocator />}
                    <Title className={styles.enterLink} level={5}>
                        {t('pages.home.landlordCabin')}
                    </Title>
                </div>
                <div
                    className={styles.serviceMarket}
                    onClick={() => navigate(serviceMarket)}
                >
                    <Title
                        level={5}
                        className={cn(
                            styles.enterLink,
                            styles.serviceMarketTitle
                        )}
                    >
                        {t('SERVICE MARKET')}
                    </Title>
                </div>
            </Space>
            <div className={styles.engineer} onClick={() => navigate(engineer)}>
                {isUserLocation.engineersWorkshop && <UserLocator />}
                <Title level={5} className={styles.enterLink}>
                    {t('pages.home.engineers')}
                </Title>
            </div>
            <StarterPackOfferModal />
            <StarterPackNotifier />
        </div>
    );
};
