import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MiningStats, MineAreaInfo, Contract } from 'features';
import { StatsAndInfo } from 'shared';

enum StatsAndInfoTab {
    miningStats,
    mineAreaInfo,
    contract,
}

const useTabs = () => {
    const { t } = useTranslation();

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
            component: MineAreaInfo,
            name: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.mineAreaInfo]
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

export const MineOwnerStatAndInfoPage: FC = () => {
    const tabs = useTabs();
    return <StatsAndInfo tabs={tabs} documentTitleScope="Mine owner" />;
};
