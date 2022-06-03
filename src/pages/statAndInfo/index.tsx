import React, { FC, useState } from 'react';
import { Page } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { DocumentTitle } from 'app/router/components/DocumentTitle';
import styles from './styles.module.scss';
import { MiningStats } from './components/MiningStats';
import { MineAreaInfo } from './components/MineAreaInfo';
import { MineCrew } from './components/MineCrew';
import { Contract } from './components/Contract';

enum StatsAndInfoTab {
    miningStats,
    mineAreaInfo,
    mineCrew,
    contract,
}

export const StatsAndInfoPage: FC = () => {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState(StatsAndInfoTab.miningStats);

    const tabs = [
        {
            id: StatsAndInfoTab.miningStats,
            name: t('pages.statsAndInfo.miningStats'),
            component: MiningStats,
        },
        {
            id: StatsAndInfoTab.mineAreaInfo,
            name: t('pages.statsAndInfo.mineAreaInfo'),
            component: MineAreaInfo,
        },
        {
            id: StatsAndInfoTab.mineCrew,
            name: t('pages.statsAndInfo.mineCrew'),
            component: MineCrew,
        },
        {
            id: StatsAndInfoTab.contract,
            name: t('pages.statsAndInfo.contract'),
            component: Contract,
        },
    ];

    const handleTabClick = (id: StatsAndInfoTab) => () => {
        setSelectedTab(id);
    };

    const selectedTabData = tabs.find((tab) => tab.id === selectedTab);
    const ContentComponent = selectedTabData?.component ?? (() => null);

    return (
        <Page removeContentPadding headerTitle={t('pages.statsAndInfo.title')}>
            <DocumentTitle
                title={`Contractor / Stats and Info / ${selectedTabData?.name} — DeepMine`}
            />
            <div className={styles.navbar}>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={cn(styles.navbarItem, {
                            [styles.navbarItemSelected]: tab.id === selectedTab,
                        })}
                        onClick={handleTabClick(tab.id)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className={styles.content}>
                <ContentComponent />
            </div>
        </Page>
    );
};
