import { PageWithTabs, useAccountName } from 'shared';
import { MineOwnerCrew } from 'features';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const MineOwnerMiningCrewPage: FC = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <PageWithTabs
            title={t('pages.contractorStatsAndInfo.mineCrew').toUpperCase()}
            tabs={[
                {
                    key: 'mineOwnerCrew',
                    children: accountName ? (
                        <MineOwnerCrew />
                    ) : (
                        <div>{t('components.common.noData')}</div>
                    ),
                    label: 'Mine crew',
                },
            ]}
        />
    );
};
