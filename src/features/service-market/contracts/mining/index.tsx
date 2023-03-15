import React, { FC } from 'react';
import { Col, Row } from 'antd';

import { ContractStatus, OrderState } from 'entities/smartcontract';
import {
    CompletedButton,
    DeleteOrder,
    SignContractorOrder,
    SignMineOwnerContractorOrder,
    TerminateContract,
} from '../../ui/actions';
import { ConditionTable, GeneralDataTable, MineOwnerTable } from '../../ui';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';

const MiningContract: FC<ContractProps> = ({ contract, accountName }) => {
    const isSelfSignedContract = contract.executor === contract.client;

    const terminateButton = (
        <TerminateContract contractId={contract.id} accountName={accountName} />
    );
    const completeButton = (
        <CompletedButton contractId={contract.id} accountName={accountName} />
    );
    const deleteButton = (
        <DeleteOrder accountName={accountName} contractId={contract.id} />
    );
    const isUserInvolved =
        contract.client === accountName || contract.executor === accountName;

    const isClientEmpty = contract.client === '';
    const isCurrentUserClientOrExecutor =
        contract.client === accountName || contract.executor === accountName;

    const isSignByClient = contract.status === ContractStatus.signed_by_client;
    const isSignByExecutor =
        contract.status === ContractStatus.signed_by_executor;
    let buttonsV2;

    if (OrderState.OpenOrder === contract.computed?.status) {
        if (isUserInvolved) {
            if (isSelfSignedContract) {
                if (isSignByClient) {
                    buttonsV2 = [
                        <SignContractorOrder
                            contract={contract}
                            accountName={accountName}
                        />,
                        deleteButton,
                    ];
                }
                if (isSignByExecutor) {
                    buttonsV2 = [
                        <SignMineOwnerContractorOrder
                            contract={contract}
                            accountName={accountName}
                            isSelfContract
                        />,
                        deleteButton,
                    ];
                }
            }

            if (isSignByClient) {
                if (contract.client === accountName) {
                    buttonsV2 = deleteButton;
                }
                if (contract.client !== accountName) {
                    buttonsV2 = (
                        <SignContractorOrder
                            contract={contract}
                            accountName={accountName}
                        />
                    );
                }
            }
            if (isSignByExecutor) {
                if (contract.executor === accountName) {
                    buttonsV2 = deleteButton;
                }
                if (contract.executor !== accountName) {
                    buttonsV2 = (
                        <SignMineOwnerContractorOrder
                            contract={contract}
                            accountName={accountName}
                            isSelfContract={false}
                        />
                    );
                }
            }
        }

        if (!isUserInvolved) {
            if (isSignByClient) {
                buttonsV2 = (
                    <SignMineOwnerContractorOrder
                        contract={contract}
                        accountName={accountName}
                        isSelfContract={false}
                    />
                );
            }
            if (isSignByExecutor) {
                buttonsV2 = (
                    <SignContractorOrder
                        contract={contract}
                        accountName={accountName}
                    />
                );
            }
        }
    }

    return (
        <div>
            <StatusHeader contract={contract} extra={buttonsV2} />
            <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <GeneralDataTable
                                contract={contract}
                                accountName={accountName}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <ConditionTable contract={contract} />
                </Col>
                <Col xs={24} md={12}>
                    <ContractorTable
                        contract={contract}
                        accountName={accountName}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <Row gutter={[32, 32]}>
                        <Col span={24}>
                            <MineOwnerTable
                                contract={contract}
                                accountName={accountName}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export { MiningContract };
