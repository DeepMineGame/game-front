import React from 'react';
import { Page } from 'shared';
import { useTranslation } from 'react-i18next';
import { CreateOrderFormV2 } from 'features';
import styles from './styles.module.scss';

export const CreateOrderPage = () => {
    const { t } = useTranslation();

    return (
        <Page
            className={styles.page}
            headerTitle={t('Create order').toUpperCase()}
        >
            <CreateOrderFormV2 />
        </Page>
    );
};
