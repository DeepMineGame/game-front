import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import { Col, PageHeader, Row } from 'antd';

import { useContractState } from 'entities/contract';
import { statusMap } from 'entities/smartcontract';
import { Completed, DeleteOrder, TerminateContract } from '../../ui/actions';
import { GeneralDataTable, ConditionTable, MineOwnerTable } from '../../ui';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';

const MiningContract: FC<ContractProps> = ({
    contract,
    accountName,
    isDeleted,
}) => {
    const { canTerminate, canDeleteSelfContract, showCompleted } =
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
