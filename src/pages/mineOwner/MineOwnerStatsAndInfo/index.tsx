import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { MiningStats, MineAreaInfo, Contract } from 'features';
import { PageWithTabs, useAccountName } from 'shared';
import { useStore } from 'effector-react';
import {
    contractStore,
    ContractType,
    getContractEffect,
} from 'entities/smartcontract';

enum StatsAndInfoTab {
    miningStats,
    mineAreaInfo,
    contract,
}

const useTabs = (userAccountName: string) => {
    const { t } = useTranslation();
    const contracts = useStore(contractStore);

    useEffect(() => {
        if (userAccountName)
            getContractEffect({ searchParam: userAccountName });
    }, [userAccountName]);

    const landLordMineOwnerContract = contracts?.filter(
        ({ type }) => type === ContractType.landlord_mineowner
    )?.[0];

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
            component: () =>
                landLordMineOwnerContract ? (
                    <Contract contract={landLordMineOwnerContract} />
                ) : (
                    <div>No data</div>
                ),
            name: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.contract]
                }`
            ),
        },
    ];
};

export const MineOwnerStatAndInfoPage: FC = () => {
    const userAccountName = useAccountName();

    const tabs = useTabs(userAccountName);
    return <PageWithTabs tabs={tabs} documentTitleScope="Mine owner" />;
};
