import { FC } from 'react';
import { Contract, PageWithTabs, useAccountName } from 'shared';
import {
    $mineOwnerStats,
    MineAreaInfo,
    MineOwnerStatsGate,
    MiningStats,
} from 'features';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    ContractsGate,
    contractStore,
    ContractType,
} from 'entities/smartcontract';
import { Role } from 'entities/gameStat';

enum Tabs {
    stats,
    areaInfo,
    contract,
}

export const MineOwnerStatAndInfoPage: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(ContractsGate);
    useGate(MineOwnerStatsGate, {
        searchParam: accountName,
        role: Role.mineowner,
    });

    const contracts = useStore(contractStore);
    const contract = contracts?.filter(
        ({ type }) => type === ContractType.landlord_mineowner
    )?.[0];
    const mineOwnerStats = useStore($mineOwnerStats);

    return (
        <PageWithTabs
            tabs={[
                {
                    key: Tabs.stats,
                    children: <MiningStats stats={mineOwnerStats} />,
                    tab: t(`pages.contractorStatsAndInfo.miningStats`),
                },
                {
                    key: Tabs.areaInfo,
                    children: <MineAreaInfo />,
                    tab: t(`pages.contractorStatsAndInfo.mineAreaInfo`),
                },
                {
                    key: Tabs.contract,
                    children: contract ? (
                        <Contract contract={contract} />
                    ) : (
                        <div>{t('components.common.noData')}</div>
                    ),
                    tab: t(`pages.contractorStatsAndInfo.contract`),
                },
            ]}
            documentTitleScope="Mine owner"
        />
    );
};
