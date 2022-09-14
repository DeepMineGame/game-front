import { useTranslation } from 'react-i18next';
import { useEvent, useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { Segmented } from 'shared';
import { TabHeader } from '../tab-header';
import { MiningContractsTable } from './MiningContractsTable';
import {
    changeFilterEvent,
    Filter,
    filteredMiningContractsStore,
    filterStore,
    getMiningContractsEffect,
    MiningContractsGate,
} from './model';

export const MiningContracts = () => {
    useGate(MiningContractsGate);
    const { t } = useTranslation();

    const contracts = useStore(filteredMiningContractsStore);
    const isLoading = useStore(getMiningContractsEffect.pending);
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
                            value: Filter.LookingForContractor,
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
