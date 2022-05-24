import React, { FC } from 'react';
import classNames from 'classnames';
import { Header, Title } from 'shared';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { contractorCabin } from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const HomePage: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className={styles.homeScreen}>
            <Header hideLogo />
            <div className={classNames(styles.mineOwnerLink, styles.enterLink)}>
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
        </div>
    );
};
