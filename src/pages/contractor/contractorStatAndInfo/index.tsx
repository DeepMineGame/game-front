import { FC } from 'react';
import { PageWithTabs, useTabs } from 'shared';
import { ContractType } from 'entities/smartcontract';

export const ContractorStatsAndInfoPage: FC = () => {
    const tabs = useTabs(ContractType.mineowner_contractor);

    return <PageWithTabs tabs={tabs} documentTitleScope="Contractor" />;
};
