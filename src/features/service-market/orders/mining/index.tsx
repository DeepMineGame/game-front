import React, { FC } from 'react';
import { Row, Col } from 'antd';
import { useOrderDelete, useOrderSign } from 'entities/order';
import { useContractType } from 'entities/contract';
import { ConditionTable, MineOwnerTable, GeneralDataTable } from '../../ui';
import {
    SignAsMineOwner,
    SignAsContractor,
    DeleteOrder,
} from '../../ui/actions';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';

const MiningOrder: FC<ContractProps> = ({ contract, accountName }) => {
    const { canSignMiningContractorOrder, canSignMiningMineOwnerOrder } =
        useOrderSign(contract, accountName);
    const { canDeleteOrder } = useOrderDelete(contract, accountName);
    const { isExecutorSigned, isClientSigned, isSelfSigned } =
        useContractType(contract);

    return (
        <div>
            <StatusHeader
                contract={contract}
                extra={[
                    canSignMiningContractorOrder && (
                        <SignAsMineOwner
                            contract={contract}
                            accountName={accountName}
                        />
                    ),
                    canSignMiningMineOwnerOrder && (
                        <SignAsContractor
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
