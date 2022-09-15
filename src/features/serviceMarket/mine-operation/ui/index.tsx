import { useTranslation } from 'react-i18next';
import { useEvent, useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { Segmented } from 'shared';
import { MiningContractsTable } from '../../mining-contracts/ui/MiningContractsTable';
import { TabGrid } from '../../ui/tab-grid';
import {
    mineOperationChangeFilterEvent,
    MineOperationFilter,
    filteredMineOperationContractsStore,
    mineOperationFilterStore,
    getMineOperationContractsEffect,
    MineOperationContractsGate,
} from '../model/model';

export const MineOperationContracts = () => {
    useGate(MineOperationContractsGate);
    const { t } = useTranslation();

    const contracts = useStore(filteredMineOperationContractsStore);
    const isLoading = useStore(getMineOperationContractsEffect.pending);
    const filter = useStore(mineOperationFilterStore);

    const changeFilter = useEvent(mineOperationChangeFilterEvent);

    const handleFilterChange = (newFilter: string | number) => {
        changeFilter(newFilter as MineOperationFilter);
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
                            value: MineOperationFilter.LookingForMineOwner,
                            label: t('pages.serviceMarket.lookingForMineOwner'),
                        },
                        {
                            value: MineOperationFilter.LookingForLandlord,
                            label: t('pages.serviceMarket.lookingForLandlord'),
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
