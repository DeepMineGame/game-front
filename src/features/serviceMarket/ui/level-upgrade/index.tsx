import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { Segmented } from 'shared';
import { Skeleton } from 'antd';
import { useEvent, useGate, useStore } from 'effector-react';
import { LevelUpgradeContractsTable } from 'shared/ui';
import { TabHeader } from '../tab-header';
import {
    changeFilterEvent,
    Filter,
    filteredLevelUpgradeContractsStore,
    filterStore,
    getLevelUpgradeContractsEffect,
    LevelUpgradeContractsGate,
} from './model';

export const LevelUpgrade: FC = () => {
    useGate(LevelUpgradeContractsGate);
    const { t } = useTranslation();

    const contracts = useStore(filteredLevelUpgradeContractsStore);
    const isLoading = useStore(getLevelUpgradeContractsEffect.pending);
    const filter = useStore(filterStore);

    const changeFilter = useEvent(changeFilterEvent);

    const handleFilterChange = (newFilter: string | number) => {
        changeFilter(newFilter as Filter);
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
                            value: Filter.LookingForEngineer,
                            label: t(
                                'pages.serviceMarket.levelUpgradeTab.lookingForEngineer'
                            ),
                        },
                        {
                            value: Filter.LookingForCitizen,
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
