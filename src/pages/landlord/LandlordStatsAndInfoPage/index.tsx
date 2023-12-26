import { PageWithTabs, useAccountName } from 'shared';
import { FC } from 'react';
import { AreaInfo, AreaStats, $areaStats, AreaStatsGate } from 'features';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

export const LandlordStatsAndInfoPage: FC = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    useGate(AreaStatsGate, { user: accountName });
    const areaStats = useStore($areaStats);
    return (
        <PageWithTabs
            tabs={[
                {
                    key: '0',
                    label: t('Area stats'),
                    children: <AreaStats data={areaStats} />,
                },
                {
                    key: '1',
                    label: t('components.common.areaInfo'),
                    children: accountName ? (
                        <AreaInfo accountName={accountName} />
                    ) : (
                        <Skeleton />
                    ),
                },
            ]}
        />
    );
};
