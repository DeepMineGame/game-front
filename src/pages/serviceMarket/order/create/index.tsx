import React from 'react';
import { Page } from 'shared';
import { CreateOrderForm } from 'features';
import styles from './styles.module.scss';

export const CreateOrderPage = () => {
    return (
        <Page className={styles.page} headerTitle="CREATE ORDER">
            <CreateOrderForm />
        </Page>
    );
};
