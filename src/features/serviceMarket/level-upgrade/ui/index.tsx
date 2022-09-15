import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { Segmented } from 'shared';
import { Skeleton } from 'antd';
import { useEvent, useGate, useStore } from 'effector-react';
import { TabHeader } from 'features/serviceMarket';
import { LevelUpgradeContractsTable } from 'shared/ui';
import {
    levelUpgradeChangeFilterEvent,
    LevelUpgradeFilter,
    filteredLevelUpgradeContractsStore,
    levelUpgradeFilterStore,
    getLevelUpgradeContractsEffect,
    LevelUpgradeContractsGate,
} from '../model';

export const LevelUpgrade: FC = () => {
    useGate(LevelUpgradeContractsGate);
    const { t } = useTranslation();

    const contracts = useStore(filteredLevelUpgradeContractsStore);
    const isLoading = useStore(getLevelUpgradeContractsEffect.pending);
    const filter = useStore(levelUpgradeFilterStore);

    const changeFilter = useEvent(levelUpgradeChangeFilterEvent);

    const handleFilterChange = (newFilter: string | number) => {
        changeFilter(newFilter as LevelUpgradeFilter);
    };

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <TabHeader
            filters={
                <Segmented
                    options={[
                        {
                            value: LevelUpgradeFilter.LookingForEngineer,
                            label: t(
                                'pages.serviceMarket.levelUpgradeTab.lookingForEngineer'
                            ),
                        },
                        {
                            value: LevelUpgradeFilter.LookingForCitizen,
                            label: t(
                                'pages.serviceMarket.levelUpgradeTab.lookingForCitizen'
                            ),
                        },
                    ]}
                    onChange={handleFilterChange}
                    value={filter}
                />
            }
            table={<LevelUpgradeContractsTable contracts={contracts} />}
        />
    );
};
