import { FC } from 'react';
import { ContractsTable } from 'shared';
import { useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';
import { ContractsGate, contractsStore, getContractsEffect } from './model';

export const ServiceMarketContractsTable: FC<{ accountName: string }> = ({
    accountName,
}) => {
    useGate(ContractsGate, { searchParam: accountName });
    const contracts = useStore(contractsStore);
    const isLoading = useStore(getContractsEffect.pending);

    if (isLoading) {
        return <Skeleton />;
    }

    return contracts?.length ? (
        <ContractsTable contracts={contracts} account={accountName} />
    ) : (
        <Empty />
    );
};
