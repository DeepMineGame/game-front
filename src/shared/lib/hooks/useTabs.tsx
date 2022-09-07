import { Skeleton } from 'antd';
import { useStore } from 'effector-react';
import { MineAreaInfo, MineCrew, MiningStats } from 'features';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    contractStore,
    ContractType,
    getContractByExecutorEffect,
} from 'entities/smartcontract';
import { Contract, Tab } from 'shared/ui';
import { useAccountName } from './useAccountName';

enum StatsAndInfoTab {
    miningStats,
    mineAreaInfo,
    mineCrew,
    contract,
}

export const useTabs = (as: ContractType): Tab[] => {
    const { t } = useTranslation();
    const contracts = useStore(contractStore);
    const userAccountName = useAccountName();

    useEffect(() => {
        if (userAccountName)
            getContractByExecutorEffect({ searchParam: userAccountName });
    }, [userAccountName]);

    const contract = contracts?.filter(({ type }) => type === as)?.[0];

    const initialTabs = [
        {
            key: StatsAndInfoTab.miningStats,
            children: <MiningStats />,
            tab: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.miningStats]
                }`
            ),
        },
        {
            key: StatsAndInfoTab.mineAreaInfo,
            children: userAccountName ? (
                <MineAreaInfo accountName={userAccountName} />
            ) : (
                <Skeleton />
            ),
            tab: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.mineAreaInfo]
                }`
            ),
        },
        {
            key: StatsAndInfoTab.contract,
            children: contract ? (
                <Contract contract={contract} />
            ) : (
                <div>No data</div>
            ),
            tab: t(
                `pages.contractorStatsAndInfo.${
                    StatsAndInfoTab[StatsAndInfoTab.contract]
                }`
            ),
        },
    ];

    return as === ContractType.mineowner_contractor
        ? [
              ...initialTabs,
              {
                  key: StatsAndInfoTab.mineCrew,
                  children: <MineCrew />,
                  tab: t(
                      `pages.contractorStatsAndInfo.${
                          StatsAndInfoTab[StatsAndInfoTab.mineCrew]
                      }`
                  ),
              },
          ]
        : initialTabs;
};
