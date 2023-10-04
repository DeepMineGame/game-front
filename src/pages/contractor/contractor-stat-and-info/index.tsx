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
import { Roles } from 'entities/game-stat';

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
        role: Roles.contractor,
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
                    key: String(StatsAndInfoTab.miningStats),
                    children: <MiningStats stats={mineOwnerStats} />,
                    label: t(`pages.contractorStatsAndInfo.miningStats`),
                },
                {
                    key: String(StatsAndInfoTab.mineAreaInfo),
                    children: <MineAreaInfo />,
                    label: t(`pages.contractorStatsAndInfo.mineAreaInfo`),
                },
                {
                    key: String(StatsAndInfoTab.contract),
                    children: contract ? (
                        <Contract contract={contract} />
                    ) : (
                        <div>{t('components.common.noData')}</div>
                    ),
                    label: t(`pages.contractorStatsAndInfo.contract`),
                },
                {
                    key: String(StatsAndInfoTab.mineCrew),
                    children: <MineCrew />,
                    label: t(`Mine crew`),
                },
            ]}
            documentTitleScope="Contractor"
        />
    );
};
