import React, { FC } from 'react';
import { Col, PageHeader, Row } from 'antd';
import { useContractState } from 'entities/contract';
import { statusMap } from 'entities/smartcontract';
import { Completed, DeleteOrder, TerminateContract } from '../../ui/actions';
import { GeneralDataTable, ConditionTable, MineOwnerTable } from '../../ui';
import { LandlordTable } from '../../ui/contract/mine-operation';
import { ContractProps } from '../../types';

const MineOperationContract: FC<ContractProps> = ({
    contract,
    accountName,
    isDeleted,
}) => {
    const { canTerminate, showCompleted, canDeleteSelfContract } =
        useContractState(contract, accountName);

    return (
        <div>
            <PageHeader
                style={{ marginBottom: '20px' }}
                ghost={false}
                title={statusMap[contract.status]}
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
                                    <Completed
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
