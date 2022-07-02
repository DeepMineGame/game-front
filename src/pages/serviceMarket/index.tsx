import React, { memo } from 'react';
import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createOrder } from 'app/router/paths';
import { PlusOutlined } from '@ant-design/icons';
import { PageWithTabs, useAccountName, Loader, Button } from 'shared';
import { MiningContracts, ServiceMarketContractsTable } from 'features';
import styles from './styles.module.scss';

export * from './order';
export * from './operationOrder';
export * from './MineOperationContractPage';

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
                    id: 1,
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
                    id: 2,
                    component: MiningContracts,
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
