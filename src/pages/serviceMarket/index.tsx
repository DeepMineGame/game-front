import { useTranslation } from 'react-i18next';
import {
    DrillBitOutlined,
    MineOutlined,
    PageWithTabs,
    useAccountName,
} from 'shared';
import {
    MineOperationContracts,
    MiningContracts,
    MyContractsTab,
} from 'features';
import { Skeleton } from 'antd';
import { ServiceMarketTabIds } from 'app/router/constants';
import { FC } from 'react';
import { UnorderedListOutlined, UpSquareOutlined } from '@ant-design/icons';
import { LevelUpgrade } from 'features/serviceMarket';
import styles from './styles.module.scss';

export * from './order';
export * from './operation';

export const ServiceMarketPage: FC = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <PageWithTabs
            className={styles.page}
            defaultDocTitle
            title={t('pages.serviceMarket.serviceMarket')}
            tabs={[
                {
                    key: ServiceMarketTabIds.myContracts,
                    children: accountName ? <MyContractsTab /> : <Skeleton />,
                    tab: (
                        <>
                            <UnorderedListOutlined />
                            {t('pages.serviceMarket.myContracts')}
                        </>
                    ),
                },
                {
                    key: ServiceMarketTabIds.miningContracts,
                    children: <MiningContracts />,
                    tab: (
                        <>
                            <DrillBitOutlined />
                            {t('pages.serviceMarket.miningContracts')}
                        </>
                    ),
                },
                {
                    key: ServiceMarketTabIds.mineOperation,
                    children: <MineOperationContracts />,
                    tab: (
                        <>
                            <MineOutlined />
                            {t('pages.serviceMarket.mineOperation')}
                        </>
                    ),
                },
                {
                    key: ServiceMarketTabIds.levelUpgrade,
                    children: <LevelUpgrade />,
                    tab: (
                        <>
                            <UpSquareOutlined />
                            {t('pages.serviceMarket.levelUpgrade')}
                        </>
                    ),
                },
            ]}
        />
    );
};
