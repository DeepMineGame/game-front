import { PageWithTabs, Tab, useAccountName } from 'shared';
import React from 'react';

import { MineOwnerCrew } from 'features';

export const MineOwnerMiningCrewPage = () => {
    const accountName = useAccountName();
    const tabs: Tab[] = [
        {
            id: 0,
            component: accountName ? MineOwnerCrew : () => <div>No data</div>,
            name: 'Mine crew',
        },
    ];
    return <PageWithTabs title="MINE CREW" tabs={tabs} />;
};
