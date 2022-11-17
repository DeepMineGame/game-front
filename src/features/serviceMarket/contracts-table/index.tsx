import { FC } from 'react';
import { ContractsTable } from 'shared';
import { useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';
import { OrderStatus, Roles } from 'entities/gameStat';
import {
    ContractsGate,
    contractsStore,
    getContractsByFilterEffect,
} from './model';

export const ServiceMarketContractsTable: FC = () => {
    useGate(ContractsGate, {
        statuses: OrderStatus.current,
        user_role: Roles.contractor,
        search_role: Roles.mineowner,
    });
    const contracts = useStore(contractsStore);
    const isLoading = useStore(getContractsByFilterEffect.pending);

    if (isLoading) {
        return <Skeleton />;
    }

    return contracts?.length ? (
        <ContractsTable contracts={contracts} />
    ) : (
        <Empty />
    );
};
