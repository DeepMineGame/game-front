import { useTranslation } from 'react-i18next';
import { PageWithTabs, useAccountName } from 'shared';
import {
    MineOperationContracts,
    MiningContracts,
    MyContractsTab,
} from 'features';
import { Skeleton } from 'antd';
import { ServiceMarketTabIds } from 'app/router/constants';
import styles from './styles.module.scss';

export * from './order';
export * from './operation';

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
                    id: ServiceMarketTabIds.myContracts,
                    component: accountName ? MyContractsTab : Skeleton,
                    name: t('pages.serviceMarket.myContracts'),
                },
                {
                    id: ServiceMarketTabIds.miningContracts,
                    component: MiningContracts,
                    name: t('pages.serviceMarket.miningContracts'),
                },
                {
                    id: ServiceMarketTabIds.mineOperation,
                    component: MineOperationContracts,
                    name: t('pages.serviceMarket.mineOperation'),
                },
            ]}
        />
    );
};
