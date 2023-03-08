import React, { FC } from 'react';
import { Col, Row } from 'antd';

import { useContractState } from 'entities/contract';
import { OrderState, OrderSubState } from 'entities/smartcontract';
import {
    CompletedAlert,
    CompletedButton,
    DeleteOrder,
    TerminateContract,
} from '../../ui/actions';
import { ConditionTable, GeneralDataTable, MineOwnerTable } from '../../ui';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';

const MiningContract: FC<ContractProps> = ({
    contract,
    accountName,
    isDeleted,
}) => {
    const { canTerminate, canDeleteSelfContract, showCompleted } =
        useContractState(contract, accountName);
    const completedAndWaitAction =
        contract.computed?.status === OrderState.WaitingForAction &&
        contract.computed.sub_status === OrderSubState.Completed;

    return (
        <div>
            <StatusHeader
                contract={contract}
                extra={[
                    canTerminate && (
                        <TerminateContract
                            contractId={contract.id}
                            accountName={accountName}
                        />
                    ),
                    canDeleteSelfContract && (
                        <DeleteOrder
                            accountName={accountName}
                            contractId={contract.id}
                        />
                    ),
                    completedAndWaitAction && (
                        <CompletedButton
                            accountName={accountName}
                            contractId={contract.id}
                        />
                    ),
                ]}
            />
            <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <GeneralDataTable
                                contract={contract}
                                accountName={accountName}
                            />
                        </Col>

                        {!isDeleted && (
                            <Col span={24}>
                                {showCompleted && (
                                    <CompletedAlert
                                        accountName={accountName}
                                        contractId={contract.id}
                                    />
                                )}
                            </Col>
                        )}
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
