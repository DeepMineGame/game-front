import { PageWithTabs, useAccountName, Loader } from 'shared';
import React, { memo } from 'react';
import { Empty } from 'antd';
import { ServiceMarketContractsTable } from 'features';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const ServiceMarketPage = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <PageWithTabs
            className={styles.page}
            defaultDocTitle
            title={t('pages.serviceMarket.serviceMarket')}
            tabs={[
                {
                    id: 1,
                    component: accountName
                        ? memo(() => (
                              <ServiceMarketContractsTable
                                  accountName={accountName}
                              />
                          ))
                        : memo(() => <Loader centered size="large" />),
                    name: t('pages.serviceMarket.myContracts'),
                },
                {
                    id: 2,
                    component: Empty,
                    name: t('pages.serviceMarket.miningContracts'),
                },
                {
                    id: 3,
                    component: Empty,
                    name: t('pages.serviceMarket.mineOperation'),
                },
            ]}
        />
    );
};
