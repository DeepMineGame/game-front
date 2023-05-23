import React from 'react';
import { Page, useAccountName } from 'shared';

import { ActiveInventoryAndStorageSwapper } from 'features';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const Warehouse = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <Page
            headerTitle={t('Warehouse').toUpperCase()}
            className={styles.background}
        >
            <ActiveInventoryAndStorageSwapper accountName={accountName} />
        </Page>
    );
};
