import { FC } from 'react';
import { Contract, PageWithTabs, useAccountName } from 'shared';
import { $mineStats, MineAreaInfo, MineStatsGate, MiningStats } from 'features';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    ContractsGate,
    contractStore,
    ContractType,
} from 'entities/smartcontract';
import { Roles } from 'entities/game-stat';

enum Tabs {
    stats,
    areaInfo,
    contract,
}

export const MineOwnerStatAndInfoPage: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(ContractsGate);
    useGate(MineStatsGate, {
        searchParam: accountName,
        role: Roles.mineowner,
    });

    const contracts = useStore(contractStore);
    const contract = contracts?.filter(
        ({ type }) => type === ContractType.landlord_mineowner
    )?.[0];
    const mineOwnerStats = useStore($mineStats);

    return (
        <PageWithTabs
            tabs={[
                {
                    key: String(Tabs.stats),
                    children: <MiningStats stats={mineOwnerStats} />,
                    label: t(`pages.contractorStatsAndInfo.miningStats`),
                },
                {
                    key: String(Tabs.areaInfo),
                    children: <MineAreaInfo />,
                    label: t(`pages.contractorStatsAndInfo.mineAreaInfo`),
                },
                {
                    key: String(Tabs.contract),
                    children: contract ? (
                        <Contract contract={contract} />
                    ) : (
                        <div>{t('components.common.noData')}</div>
                    ),
                    label: t(`pages.contractorStatsAndInfo.contract`),
                },
            ]}
            documentTitleScope="Mine owner"
        />
    );
};
