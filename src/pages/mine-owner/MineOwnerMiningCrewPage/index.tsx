import { PageWithTabs, useAccountName } from 'shared';
import { MineOwnerCrew } from 'features';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const MineOwnerMiningCrewPage: FC = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    return (
        <PageWithTabs
            title={t('Mine crew').toUpperCase()}
            tabs={[
                {
                    key: '0',
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
