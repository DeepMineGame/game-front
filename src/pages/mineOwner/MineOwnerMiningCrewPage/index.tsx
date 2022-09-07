import { PageWithTabs, useAccountName } from 'shared';
import { MineOwnerCrew } from 'features';
import { FC } from 'react';

export const MineOwnerMiningCrewPage: FC = () => {
    const accountName = useAccountName();

    return (
        <PageWithTabs
            title="MINE CREW"
            tabs={[
                {
                    key: 0,
                    children: accountName ? (
                        <MineOwnerCrew />
                    ) : (
                        <div>No data</div>
                    ),
                    tab: 'Mine crew',
                },
            ]}
        />
    );
};
