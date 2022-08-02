import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useEvent, useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';

import { Button, DAY_IN_SECONDS, Segmented } from 'shared';
import { createOrder } from 'app/router/paths';
import { ContractDto } from 'entities/smartcontract';
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

const calcContractDuration = (contract: ContractDto) =>
    Math.floor((contract.finishes_at - contract.create_time) / DAY_IN_SECONDS);

export const MiningContracts = () => {
    useGate(MiningContractsGate);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                <Button
                    type="primary"
                    onClick={handleCreateOrder}
                    icon={<PlusOutlined />}
                >
                    {t('pages.serviceMarket.createOrder.createOrder')}
                </Button>
            </nav>
            {contracts.length ? (
                <MiningContractsTable
                    contracts={contracts}
                    calcDuration={calcContractDuration}
                />
            ) : (
                <Empty />
            )}
        </div>
    );
};
