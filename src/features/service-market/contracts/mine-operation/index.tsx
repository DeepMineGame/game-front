import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { useContractState } from 'entities/contract';
import {
    CompletedAlert,
    DeleteOrder,
    TerminateContract,
} from '../../ui/actions';
import { GeneralDataTable, ConditionTable, MineOwnerTable } from '../../ui';
import { LandlordTable } from '../../ui/contract/mine-operation';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';

const MineOperationContract: FC<ContractProps> = ({
    contract,
    accountName,
    isDeleted,
}) => {
    const { canTerminate, showCompleted, canDeleteSelfContract } =
        useContractState(contract, accountName);
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
                    <LandlordTable
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

                        <Col span={24}>
                            <Row justify="end">
                                {canTerminate && (
                                    <TerminateContract
                                        contractId={contract.id}
                                        accountName={accountName}
                                    />
                                )}
                                {canDeleteSelfContract && (
                                    <DeleteOrder
                                        accountName={accountName}
                                        contractId={contract.id}
                                    />
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export { MineOperationContract };
