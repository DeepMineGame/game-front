import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useGate, useStore } from 'effector-react';
import { Empty, Skeleton } from 'antd';
import { useAccountName, Page } from 'shared';
import {
    OperationOrder,
    ContractsGate,
    contractsStore,
    getContractsEffect,
} from 'features';

export const OrderPage = () => {
    const accountName = useAccountName();
    const { orderId = -1 } = useParams();
    const { t } = useTranslation();

    useGate(ContractsGate, { searchParam: accountName });
    const contracts = useStore(contractsStore);
    const isLoading = useStore(getContractsEffect.pending);

    const contract = contracts?.find(({ id }) => id === +orderId);

    return (
        <Page
            headerTitle={t(
                'pages.mineOperationOrder.mineOperationOrder'
            ).toUpperCase()}
        >
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading || !accountName ? (
                <Skeleton />
            ) : contract ? (
                <OperationOrder accountName={accountName} contract={contract} />
            ) : (
                <Empty />
            )}
        </Page>
    );
};
