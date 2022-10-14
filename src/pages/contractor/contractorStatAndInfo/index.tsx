import { FC } from 'react';
import { Contract, PageWithTabs, useAccountName } from 'shared';
import {
    $mineStats,
    MineAreaInfo,
    MineCrew,
    MineStatsGate,
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

enum StatsAndInfoTab {
    miningStats,
    mineAreaInfo,
    mineCrew,
    contract,
}
export const ContractorStatsAndInfoPage: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(ContractsGate);
    useGate(MineStatsGate, {
        searchParam: accountName,
        role: Role.contractor,
    });
    const contracts = useStore(contractStore);

    const contract = contracts?.filter(
        ({ type }) => type === ContractType.mineowner_contractor
    )?.[0];

    const mineOwnerStats = useStore($mineStats);
    return (
        <PageWithTabs
            tabs={[
                {
                    key: StatsAndInfoTab.miningStats,
                    children: <MiningStats stats={mineOwnerStats} />,
                    tab: t(`pages.contractorStatsAndInfo.miningStats`),
                },
                {
                    key: StatsAndInfoTab.mineAreaInfo,
                    children: <MineAreaInfo />,
                    tab: t(`pages.contractorStatsAndInfo.mineAreaInfo`),
                },
                {
                    key: StatsAndInfoTab.contract,
                    children: contract ? (
                        <Contract contract={contract} />
                    ) : (
                        <div>{t('components.common.noData')}</div>
                    ),
                    tab: t(`pages.contractorStatsAndInfo.contract`),
                },
                {
                    key: StatsAndInfoTab.mineCrew,
                    children: <MineCrew />,
                    tab: t(`pages.contractorStatsAndInfo.mineCrew`),
                },
            ]}
            documentTitleScope="Contractor"
        />
    );
};
