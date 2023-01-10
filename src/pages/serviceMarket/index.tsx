import { useTranslation } from 'react-i18next';
import { PageWithTabs, useAccountName } from 'shared';
import { LandlordTab, MineOwnerTab, ContractorTab } from 'features';
import { Skeleton } from 'antd';
import { ServiceMarketTabIds } from 'app/router/constants';
import { FC } from 'react';
import { EngineerTab } from 'features/serviceMarket';
import styles from './styles.module.scss';

export * from './order';
export * from './operation';

export const ServiceMarketPage: FC = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <PageWithTabs
            tabProps={{
                tabBarExtraContent: {
                    left: 'I am: \u00a0 ',
                },
                destroyInactiveTabPane: true,
            }}
            className={styles.page}
            defaultDocTitle
            title={t('pages.serviceMarket.serviceMarket')}
            tabs={[
                {
                    key: ServiceMarketTabIds.contractor,
                    children: accountName ? <ContractorTab /> : <Skeleton />,
                    label: t('pages.serviceMarket.contract.contractor'),
                },
                {
                    key: ServiceMarketTabIds.mineOwner,
                    children: <MineOwnerTab />,
                    label: t('roles.mineowner'),
                },
                {
                    key: ServiceMarketTabIds.landLord,
                    children: <LandlordTab />,
                    label: t('roles.landlord'),
                },
                {
                    key: ServiceMarketTabIds.levelUpgrade,
                    children: <EngineerTab />,
                    label: t('roles.engineer'),
                },
            ]}
        />
    );
};
