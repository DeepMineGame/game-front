import { useTranslation } from 'react-i18next';
import { Page, PageWithTabs, useAccountName } from 'shared';
import {
    LandlordTab,
    MyContracts,
    MineOwnerTab,
    ContractorTab,
    $isPressedMyContracts,
} from 'features';
import { Skeleton } from 'antd';
import { ServiceMarketTabIds } from 'app/router/constants';
import { FC } from 'react';
import { useStore } from 'effector-react';
import { EngineerTab } from 'features/serviceMarket';
import styles from './styles.module.scss';

export * from './order';
export * from './operation';

export const ServiceMarketPage: FC = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    const isMyContractsPressed = useStore($isPressedMyContracts);

    return isMyContractsPressed ? (
        <Page
            className={styles.page}
            headerTitle={t('pages.serviceMarket.myContracts').toUpperCase()}
        >
            <MyContracts />
        </Page>
    ) : (
        <PageWithTabs
            tabProps={{
                tabBarExtraContent: {
                    left: 'I am: \u00a0 ',
                },
                destroyInactiveTabPane: true,
            }}
            className={styles.page}
            defaultDocTitle
            title={t('pages.serviceMarket.serviceMarket').toUpperCase()}
            tabs={[
                {
                    key: ServiceMarketTabIds.contractor,
                    children: accountName ? <ContractorTab /> : <Skeleton />,
                    tab: t('pages.serviceMarket.contract.contractor'),
                },
                {
                    key: ServiceMarketTabIds.mineOwner,
                    children: <MineOwnerTab />,
                    tab: t('roles.mineowner'),
                },
                {
                    key: ServiceMarketTabIds.landLord,
                    children: <LandlordTab />,
                    tab: t('roles.landlord'),
                },
                {
                    key: ServiceMarketTabIds.levelUpgrade,
                    children: <EngineerTab />,
                    tab: t('roles.engineer'),
                },
            ]}
        />
    );
};
