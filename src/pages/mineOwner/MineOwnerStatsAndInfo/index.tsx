import { FC } from 'react';
import { PageWithTabs, useTabs } from 'shared';
import { ContractType } from 'entities/smartcontract';

export const MineOwnerStatAndInfoPage: FC = () => {
    const tabs = useTabs(ContractType.landlord_mineowner);

    return <PageWithTabs tabs={tabs} documentTitleScope="Mine owner" />;
};
