import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createOrder } from 'app/router/paths';
import { PlusOutlined } from '@ant-design/icons';
import { PageWithTabs, useAccountName, Loader, Button } from 'shared';
import {
    MineOperationContracts,
    MiningContracts,
    ServiceMarketContractsTable,
} from 'features';

import styles from './styles.module.scss';

export * from './order';
export * from './operation';

enum tabsId {
    myContracts,
    miningContracts,
    mineOperation,
}

export const ServiceMarketPage = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <PageWithTabs
            className={styles.page}
            defaultDocTitle
            title={t('pages.serviceMarket.serviceMarket')}
            tabs={[
                {
                    id: tabsId.myContracts,
                    component: accountName
                        ? memo(() => (
                              <>
                                  <div className={styles.createButtonWrapper}>
                                      <Button
                                          type="primary"
                                          onClick={() => navigate(createOrder)}
                                          icon={<PlusOutlined />}
                                      >
                                          {t(
                                              'pages.serviceMarket.createOrder.createOrder'
                                          )}
                                      </Button>
                                  </div>
                                  <ServiceMarketContractsTable
                                      accountName={accountName}
                                  />
                              </>
                          ))
                        : memo(() => <Loader centered size="large" />),
                    name: t('pages.serviceMarket.myContracts'),
                },
                {
                    id: tabsId.miningContracts,
                    component: MiningContracts,
                    name: t('pages.serviceMarket.miningContracts'),
                },
                {
                    id: tabsId.mineOperation,
                    component: MineOperationContracts,
                    name: t('pages.serviceMarket.mineOperation'),
                },
            ]}
        />
    );
};
