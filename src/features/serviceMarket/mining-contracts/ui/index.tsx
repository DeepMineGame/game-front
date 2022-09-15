import { useTranslation } from 'react-i18next';
import { useEvent, useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { Segmented } from 'shared';
import { TabGrid } from '../../ui/tab-grid';
import {
    miningContractsChangeFilterEvent,
    MiningContractsFilter,
    filteredMiningContractsStore,
    miningContractsFilterStore,
    getMiningContractsEffect,
    MiningContractsGate,
} from '../model/model';
import { MiningContractsTable } from './MiningContractsTable';

export const MiningContracts = () => {
    useGate(MiningContractsGate);
    const { t } = useTranslation();

    const contracts = useStore(filteredMiningContractsStore);
    const isLoading = useStore(getMiningContractsEffect.pending);
    const filter = useStore(miningContractsFilterStore);

    const changeFilter = useEvent(miningContractsChangeFilterEvent);

    const handleFilterChange = (newFilter: string | number) => {
        changeFilter(newFilter as MiningContractsFilter);
    };

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <TabGrid
            filters={
                <Segmented
                    options={[
                        {
                            value: MiningContractsFilter.LookingForMineOwner,
                            label: t('pages.serviceMarket.lookingForMineOwner'),
                        },
                        {
                            value: MiningContractsFilter.LookingForContractor,
                            label: t(
                                'pages.serviceMarket.lookingForContractor'
                            ),
                        },
                    ]}
                    onChange={handleFilterChange}
                    value={filter}
                />
            }
            table={<MiningContractsTable contracts={contracts} />}
        />
    );
};
