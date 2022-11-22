import { useParams } from 'react-router';
import { useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { Page, useAccountName } from 'shared';
import {
    ContractGate,
    contractStore,
    getContractEffect,
} from 'entities/contract';
import { ContractStatus } from 'entities/smartcontract';
import { NotFoundPage } from '../../not-found';
import { ContractPage } from './ContractPage';
import { OrderPage } from './OrderPage';

const ORDER_STATUS = [
    ContractStatus.signed_by_client,
    ContractStatus.signed_by_executor,
];

export const OperationPage = () => {
    const accountName = useAccountName();
    const { contractId = '-1' } = useParams();

    useGate(ContractGate, { id: contractId });

    const contract = useStore(contractStore);
    const isContractLoading = useStore(getContractEffect.pending);
    const isLoading = isContractLoading || !accountName;

    if (isLoading) {
        return (
            <Page>
                <Skeleton />
            </Page>
        );
    }

    if (!contract) {
        return <NotFoundPage />;
    }

    if (ORDER_STATUS.includes(contract.status)) {
        return <OrderPage contract={contract} accountName={accountName} />;
    }

    return <ContractPage contract={contract} accountName={accountName} />;
};
