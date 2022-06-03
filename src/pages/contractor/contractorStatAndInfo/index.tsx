import React, { FC, useState } from 'react';
import { Page, Navbar } from 'shared';
import { useTranslation } from 'react-i18next';

import { DocumentTitle } from 'app/router/components/DocumentTitle';
import { MiningStats, MineAreaInfo, MineCrew, Contract } from 'features';
import styles from './styles.module.scss';

enum StatsAndInfoTab {
    miningStats,
    mineAreaInfo,
    mineCrew,
    contract,
}

const tabs = [
    {
        id: StatsAndInfoTab.miningStats,
        component: MiningStats,
    },
    {
        id: StatsAndInfoTab.mineAreaInfo,
        component: MineAreaInfo,
    },
    {
        id: StatsAndInfoTab.mineCrew,
        component: MineCrew,
    },
    {
        id: StatsAndInfoTab.contract,
        component: Contract,
    },
];

export const ContractorStatsAndInfoPage: FC = () => {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState(StatsAndInfoTab.miningStats);

    const handleTabSelect = (id: number) => {
        setSelectedTab(id as StatsAndInfoTab);
    };

    const selectedTabData = tabs.find((tab) => tab.id === selectedTab);
    const ContentComponent = selectedTabData?.component ?? (() => null);

    const navbarTabs = tabs.map((tab) => ({
        id: tab.id,
        name: t(`pages.contractorStatsAndInfo.${StatsAndInfoTab[tab.id]}`),
    }));

    return (
        <Page
            removeContentPadding
            headerTitle={t('components.statsAndInfo.title')}
        >
            <DocumentTitle
                title={`Contractor / Stats and Info / ${t(
                    `pages.contractorStatsAndInfo.${selectedTabData?.id}`
                )} — DeepMine`}
            />
            <Navbar
                selectedTabId={selectedTab}
                tabs={navbarTabs}
                onTabSelect={handleTabSelect}
            />
            <div className={styles.content}>
                <ContentComponent />
            </div>
        </Page>
    );
};
