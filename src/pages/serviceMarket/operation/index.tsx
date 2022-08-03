import React from 'react';
import { useParams } from 'react-router';
import { useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';
import { Page, useAccountName } from 'shared';
import { ContractGate, contractStore, getContractEffect } from 'features';
import { ContractStatus } from 'entities/smartcontract';
import { ContractPage } from './ContractPage';
import { OrderPage } from './OrderPage';

const ORDER_STATUS = [
    ContractStatus.signed_by_client,
    ContractStatus.signed_by_executor,
];

export const OperationPage = () => {
    const accountName = useAccountName();
    const { contractId = -1 } = useParams();

    useGate(ContractGate, { searchParam: `${contractId}` });

    const contracts = useStore(contractStore);
    const isContractLoading = useStore(getContractEffect.pending);
    const contract = contracts?.[0];
    const isLoading = isContractLoading || !accountName;

    if (isLoading) {
        return (
            <Page>
                <Skeleton />
            </Page>
        );
    }

    if (!contract) {
        return (
            <Page>
                <Empty />
            </Page>
        );
    }

    if (ORDER_STATUS.includes(contract.status)) {
        return <OrderPage contract={contract} accountName={accountName} />;
    }

    return <ContractPage contract={contract} accountName={accountName} />;
};
