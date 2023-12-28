import { FC } from 'react';

import { PageWithTabs, useAccountName } from 'shared';
import { TableWithTitle } from 'features';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    $engineerInfo,
    $engineerStat,
    EngineerStatInfo,
} from 'features/engineer';
import { EngineerStat } from './ui';

enum Tabs {
    info,
    stat,
}

export const EngineerStatPage: FC = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(EngineerStatInfo, { user: accountName });
    const engineerStatInfo = useStore($engineerInfo);
    const engineerStat = useStore($engineerStat);

    return (
        <PageWithTabs
            tabs={[
                {
                    key: String(Tabs.info),
                    children: (
                        <TableWithTitle
                            title={t('Engineers info')}
                            data={{
                                [t('Certificate')]:
                                    engineerStatInfo?.certificate_asset_id,
                                [t('Level')]: engineerStatInfo?.level,
                                [t('Skills learned')]:
                                    engineerStatInfo?.skills_count,
                                [t(
                                    'Average start time of the contract after the offer'
                                )]: engineerStatInfo?.start_time_gap,
                            }}
                        />
                    ),
                    label: t(`My info`),
                },
                {
                    key: String(Tabs.stat),
                    children: <EngineerStat data={engineerStat} />,
                    label: t(`My stat`),
                },
            ]}
            documentTitleScope="Engineer stat and info"
        />
    );
};
