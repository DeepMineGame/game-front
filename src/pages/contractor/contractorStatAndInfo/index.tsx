import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MiningStats, MineAreaInfo, MineCrew } from 'features';
import { Contract, PageWithTabs, useAccountName } from 'shared';
import { Skeleton } from 'antd';

enum StatsAndInfoTab {
    miningStats,
    mineAreaInfo,
    mineCrew,
    contract,
}

const useTabs = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();

    return [
        {
            id: StatsAndInfoTab.miningStats,
            component: MiningStats,
            name: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.miningStats]
                }`
            ),
        },
        {
            id: StatsAndInfoTab.mineAreaInfo,
            component: accountName ? MineAreaInfo : Skeleton,
            name: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.mineAreaInfo]
                }`
            ),
        },
        {
            id: StatsAndInfoTab.mineCrew,
            component: MineCrew,
            name: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.mineCrew]
                }`
            ),
        },
        {
            id: StatsAndInfoTab.contract,
            component: Contract,
            name: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.contract]
                }`
            ),
        },
    ];
};

export const ContractorStatsAndInfoPage: FC = () => {
    const tabs = useTabs();
    return <PageWithTabs tabs={tabs} documentTitleScope="Contractor" />;
};
