import React, { FC } from 'react';
import { Row, Col, PageHeader, Space } from 'antd';
import { useOrderDelete, useOrderSign } from 'entities/order';
import { useContractType } from 'entities/contract';
import { statusMap } from 'entities/smartcontract';
import { ConditionTable, MineOwnerTable, GeneralDataTable } from '../../ui';
import {
    SignContractorOrder,
    SignMineOwnerContractorOrder,
    DeleteOrder,
} from '../../ui/actions';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';

const MiningOrder: FC<ContractProps> = ({ contract, accountName }) => {
    const { canSignMiningContractorOrder, canSignMiningMineOwnerOrder } =
        useOrderSign(contract, accountName);
    const { canDeleteOrder } = useOrderDelete(contract, accountName);
    const { isExecutorSigned, isClientSigned, isSelfSigned } =
        useContractType(contract);

    return (
        <div>
            <PageHeader
                style={{ marginBottom: '20px' }}
                ghost={false}
                title={statusMap[contract.status]}
                extra={[
                    canSignMiningContractorOrder && (
                        <SignContractorOrder
                            contract={contract}
                            accountName={accountName}
                        />
                    ),
                    canSignMiningMineOwnerOrder && (
                        <SignMineOwnerContractorOrder
                            contract={contract}
                            accountName={accountName}
                            isSelfContract={isSelfSigned}
                        />
                    ),
                    canDeleteOrder && (
                        <DeleteOrder
                            accountName={accountName}
                            contractId={contract.id}
                        />
                    ),
                ]}
            />
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <GeneralDataTable
                        contract={contract}
                        accountName={accountName}
                    />
                </Col>
                <Col xs={24} md={12}>
                    {isExecutorSigned && (
                        <ContractorTable
                            contract={contract}
                            accountName={accountName}
                        />
                    )}
                    {isClientSigned && (
                        <MineOwnerTable
                            contract={contract}
                            accountName={accountName}
                        />
                    )}
                </Col>
                <Col xs={24} md={12}>
                    <Row gutter={[32, 32]}>
                        <Col span={24}>
                            <ConditionTable contract={contract} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export { MiningOrder };
