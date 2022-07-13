import { PageWithTabs, useAccountName } from 'shared';
import React, { memo } from 'react';
import { AreaStats } from 'features';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

export const LandlordStatsAndInfoPage = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <PageWithTabs
            tabs={[
                {
                    id: 1,
                    name: t('components.common.areaInfo'),
                    component: accountName
                        ? memo(() => <AreaStats accountName={accountName} />)
                        : Skeleton,
                },
            ]}
        />
    );
};
