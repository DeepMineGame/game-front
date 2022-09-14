import { useTranslation } from 'react-i18next';
import { useEvent, useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { Segmented } from 'shared';
import { MiningContractsTable } from '../mining-contracts/MiningContractsTable';
import { TabHeader } from '../tab-header';
import {
    changeFilterEvent,
    Filter,
    filteredMineOperationContractsStore,
    filterStore,
    getMineOperationContractsEffect,
    MineOperationContractsGate,
} from './model';

export const MineOperationContracts = () => {
    useGate(MineOperationContractsGate);
    const { t } = useTranslation();

    const contracts = useStore(filteredMineOperationContractsStore);
    const isLoading = useStore(getMineOperationContractsEffect.pending);
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
                            value: Filter.LookingForMineOwner,
                            label: t('pages.serviceMarket.lookingForMineOwner'),
                        },
                        {
                            value: Filter.LookingForLandlord,
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
