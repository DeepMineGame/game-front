import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useEvent, useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';

import { Button, Segmented } from 'shared';
import { createOrder } from 'app/router/paths';
import { MiningContractsTable } from './MiningContractsTable';
import {
    changeFilterEvent,
    Filter,
    filteredMiningContractsStore,
    filterStore,
    getMiningContractsEffect,
    MiningContractsGate,
} from './model';

import styles from './styles.module.scss';

const filters: Filter[] = [
    Filter.LookingForMineOwner,
    Filter.LookingForContractor,
];

export const MiningContracts = () => {
    useGate(MiningContractsGate);
    const navigate = useNavigate();

    const contracts = useStore(filteredMiningContractsStore);
    const isLoading = useStore(getMiningContractsEffect.pending);
    const filter = useStore(filterStore);

    const changeFilter = useEvent(changeFilterEvent);

    const handleFilterChange = (newFilter: string | number) => {
        changeFilter(newFilter as Filter);
    };

    const handleCreateOrder = () => {
        navigate(createOrder);
    };

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <div>
            <nav className={styles.nav}>
                <Segmented
                    options={filters}
                    onChange={handleFilterChange}
                    value={filter}
                />
                <Button type="primary" onClick={handleCreateOrder}>
                    <PlusOutlined />
                    <span>Create order</span>
                </Button>
            </nav>
            {contracts.length ? (
                <MiningContractsTable contracts={contracts} />
            ) : (
                <Empty />
            )}
        </div>
    );
};
