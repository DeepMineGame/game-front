import React from 'react';
import { Page, useAccountName } from 'shared';

import { ActiveInventoryAndStorageSwapper } from 'features';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const Warehouse = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <Page
            headerTitle={t('components.hive.warehouse').toUpperCase()}
            className={styles.background}
        >
            {accountName ? (
                <ActiveInventoryAndStorageSwapper accountName={accountName} />
            ) : (
                <Skeleton />
            )}
        </Page>
    );
};
