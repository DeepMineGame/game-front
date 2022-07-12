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
    TerminatedOrder,
} from 'features';
import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';

export const OrderPage = () => {
    const accountName = useAccountName();
    const { orderId = -1 } = useParams();
    const { t } = useTranslation();

    useGate(ContractsGate, { searchParam: accountName });
    const contracts = useStore(contractsStore);
    const isLoading = useStore(getContractsEffect.pending);

    const currentContract = contracts?.find(({ id }) => id === +orderId);

    const renderContract = (contract: ContractDto) => {
        if (contract.status === ContractStatus.terminated) {
            return <TerminatedOrder contract={contract} />;
        }

        if (contract.type === ContractType.landlord_mineowner) {
            return (
                <OperationOrder contract={contract} accountName={accountName} />
            );
        }

        return (
            <span>
                {/* todo: add other contact types */}
                contract type: {contract.type}
                <br />
                contract status: {contract.status}
            </span>
        );
    };

    return (
        <Page
            headerTitle={t(
                'pages.mineOperationOrder.mineOperationOrder'
            ).toUpperCase()}
        >
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading || !accountName ? (
                <Skeleton />
            ) : currentContract ? (
                renderContract(currentContract)
            ) : (
                <Empty />
            )}
        </Page>
    );
};
