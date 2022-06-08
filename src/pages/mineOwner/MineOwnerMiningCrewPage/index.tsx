import { PageWithTabs, Tab } from 'shared';
import React, { memo } from 'react';
import { Crew } from 'features';

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
