import { PageWithTabs, useAccountName } from 'shared';
import { FC } from 'react';
import { AreaStats } from 'features';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

export const LandlordStatsAndInfoPage: FC = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <PageWithTabs
            tabs={[
                {
                    key: 0,
                    tab: t('components.common.areaInfo'),
                    children: accountName ? (
                        <AreaStats accountName={accountName} />
                    ) : (
                        <Skeleton />
                    ),
                },
            ]}
        />
    );
};
