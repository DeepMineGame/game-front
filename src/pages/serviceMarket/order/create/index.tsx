import React from 'react';
import { Page } from 'shared';
import { CreateOrderForm } from 'features';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const CreateOrderPage = () => {
    const { t } = useTranslation();

    return (
        <Page
            className={styles.page}
            headerTitle={t(
                'pages.serviceMarket.createOrder.createOrder'
            ).toUpperCase()}
        >
            <CreateOrderForm />
        </Page>
    );
};
