import { FC } from 'react';
import { Button, Header, Title, useUserLocation } from 'shared';
import { useNavigate } from 'react-router-dom';
import { hive, landLord, serviceMarket, wasteland } from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import cn from 'classnames';
import { UserLocator } from 'entities/user';
import styles from './styles.module.scss';

export const CityPage: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isUserLocation = useUserLocation();

    return (
        <div className={styles.homeScreen}>
            <Header />
            <Button type="primary" danger>
                asdasd
            </Button>
            <div onClick={() => navigate(wasteland)} className={styles.mine}>
                <div className={styles.mineOwnerTitle}>
                    <Title level={5}>{t('pages.home.mineOwnerCabin')}</Title>
                </div>
                {(isUserLocation.mine || isUserLocation.mineDeck) && (
                    <UserLocator />
                )}
            </div>
            <Space>
                <div className={styles.hive} onClick={() => navigate(hive)}>
                    {isUserLocation.hive && <UserLocator />}
                    <div className={styles.enterLink}>
                        <Title level={5}>{t('pages.home.hive')}</Title>
                    </div>
                </div>
                <div
                    className={styles.landlordLounge}
                    onClick={() => navigate(landLord)}
                >
                    {isUserLocation.landlordReception && <UserLocator />}
                    <div className={styles.enterLink}>
                        <Title level={5}>{t('pages.home.landlordCabin')}</Title>
                    </div>
                </div>
                <div
                    className={styles.serviceMarket}
                    onClick={() => navigate(serviceMarket)}
                >
                    <div
                        className={cn(
                            styles.enterLink,
                            styles.serviceMarketTitle
                        )}
                    >
                        <Title level={5}>
                            {t('pages.serviceMarket.serviceMarket')}
                        </Title>
                    </div>
                </div>
            </Space>
            <div
                className={styles.engineer}
                onClick={() => navigate('/TODO_LINK_TO_ENGINEER')}
            >
                {isUserLocation.engineersWorkshop && <UserLocator />}
                <div className={styles.enterLink}>
                    <Title level={5}>{t('pages.home.engineers')}</Title>
                </div>
            </div>
        </div>
    );
};
