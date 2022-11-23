import { useParams } from 'react-router';
import { useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { Page, useAccountName } from 'shared';
import {
    ContractGate,
    contractStore,
    getContractEffect,
    useContractType as getContractType,
} from 'entities/contract';
import { NotFoundPage } from '../../not-found';
import { ContractPage } from './ContractPage';
import { OrderPage } from './OrderPage';

export const OperationPage = () => {
    const accountName = useAccountName();
    const { contractId = '-1' } = useParams();

    useGate(ContractGate, { id: contractId });

    const contract = useStore(contractStore);
    const isContractLoading = useStore(getContractEffect.pending);
    const isLoading = isContractLoading || !accountName;
    const isOrder = contract && getContractType(contract).isOrder;

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

    if (isOrder) {
        return <OrderPage contract={contract} accountName={accountName} />;
    }

    return <ContractPage contract={contract} accountName={accountName} />;
};
