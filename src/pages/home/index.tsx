import { FC } from 'react';
import classNames from 'classnames';
import { Header, Title } from 'shared';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    contractorCabin,
    hive,
    landLord,
    mineOwner,
    serviceMarket,
} from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const HomePage: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className={styles.homeScreen}>
            <Header />
            <div
                onClick={() => navigate(mineOwner)}
                className={classNames(styles.mineOwnerLink, styles.enterLink)}
            >
                <Title level={5}>{t('pages.home.mineOwnerCabin')}</Title>
                <DownOutlined />
            </div>
            <div
                className={classNames(styles.contractorCabin, styles.enterLink)}
                onClick={() => navigate(contractorCabin)}
            >
                <Title level={5}>{t('pages.home.contractorCabin')}</Title>
                <DownOutlined />
            </div>
            <div
                className={classNames(styles.hive, styles.enterLink)}
                onClick={() => navigate(hive)}
            >
                <Title level={5}>{t('pages.home.hive')}</Title>
                <DownOutlined />
            </div>
            <div
                className={classNames(styles.serviceMarket, styles.enterLink)}
                onClick={() => navigate(serviceMarket)}
            >
                <Title level={5}>
                    {t('pages.serviceMarket.serviceMarket')}
                </Title>
                <DownOutlined />
            </div>{' '}
            <div
                className={classNames(styles.landlordCabin, styles.enterLink)}
                onClick={() => navigate(landLord)}
            >
                <Title level={5}>{t('pages.home.landlordCabin')}</Title>
                <DownOutlined />
            </div>
        </div>
    );
};
