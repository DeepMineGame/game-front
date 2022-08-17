import { useTranslation } from 'react-i18next';
import { PageWithTabs, useAccountName } from 'shared';
import {
    MineOperationContracts,
    MiningContracts,
    MyContractsTab,
} from 'features';
import { Skeleton } from 'antd';
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
    return (
        <PageWithTabs
            className={styles.page}
            defaultDocTitle
            title={t('pages.serviceMarket.serviceMarket')}
            tabs={[
                {
                    id: tabsId.myContracts,
                    component: accountName ? MyContractsTab : Skeleton,
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
