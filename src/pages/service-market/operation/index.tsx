import { useParams } from 'react-router';
import { useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { Page, useAccountName } from 'shared';
import {
    ContractGate,
    contractStore,
    getContractEffect,
} from 'entities/contract';

import { NotFoundPage } from '../../not-found';
import { ContractPage } from './ContractPage';

export const OperationPage = () => {
    const accountName = useAccountName();
    const { contractId = '-1' } = useParams();

    useGate(ContractGate, { id: contractId, accountName });

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

    return <ContractPage contract={contract} accountName={accountName} />;
};
