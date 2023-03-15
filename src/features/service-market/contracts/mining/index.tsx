import React, { FC } from 'react';
import { Col, Row } from 'antd';

import {
    ContractStatus,
    OrderState,
    OrderSubState,
} from 'entities/smartcontract';
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

    const isSignByClient = contract.status === ContractStatus.signed_by_client;
    const isSignByExecutor =
        contract.status === ContractStatus.signed_by_executor;
    let buttonsV2;

    if (OrderState.OpenOrder === contract.computed?.status) {
        if (isUserInvolved) {
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
            if (isSelfSignedContract) {
                if (isSignByClient) {
                    buttonsV2 = [
                        <SignMineOwnerContractorOrder
                            contract={contract}
                            accountName={accountName}
                            isSelfContract
                        />,
                        deleteButton,
                    ];
                }
                if (isSignByExecutor) {
                    buttonsV2 = [
                        <SignContractorOrder
                            contract={contract}
                            accountName={accountName}
                            isClient={1}
                        />,
                        deleteButton,
                    ];
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
    if (OrderState.ValidContract === contract.computed?.status) {
        if (isUserInvolved) {
            buttonsV2 = terminateButton;
        }
    }
    if (OrderState.WaitingForAction === contract.computed?.status) {
        if (isUserInvolved) {
            if (OrderSubState.undefined === contract.computed?.sub_status) {
                buttonsV2 = completeButton;
            }
            if (
                OrderSubState.PrematureTerminated ===
                contract.computed?.sub_status
            ) {
                buttonsV2 = terminateButton;
            }
            if (isSelfSignedContract) {
                if (OrderSubState.undefined === contract.computed?.sub_status) {
                    buttonsV2 = completeButton;
                }
                if (OrderSubState.Completed === contract.computed?.sub_status) {
                    buttonsV2 = completeButton;
                }
                if (OrderSubState.Active === contract.computed?.sub_status) {
                    buttonsV2 = terminateButton;
                }
                if (
                    OrderSubState.PrematureTerminated ===
                    contract.computed?.sub_status
                ) {
                    buttonsV2 = deleteButton;
                }
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
