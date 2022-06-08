import { PageWithTabs, Tab, Crew } from 'shared';
import React, { memo } from 'react';

export const MineOwnerMiningCrewPage = () => {
    const tabs: Tab[] = [
        {
            id: 1,
            component: memo(() => <Crew />),
            name: 'Mine crew',
        },
    ];
    return <PageWithTabs title="MINE CREW" tabs={tabs} />;
};
