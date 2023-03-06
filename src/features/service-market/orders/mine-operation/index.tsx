import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { Row, Col } from 'antd';
import { rolesStore } from 'entities/smartcontract';
import { useContractType } from 'entities/contract';
import { useOrderDelete, useOrderSign } from 'entities/order';
import { useUserRoles } from 'shared/lib/hooks';
import { LandlordTable } from '../../ui/contract/mine-operation';
import { ConditionTable, MineOwnerTable, GeneralDataTable } from '../../ui';
import {
    SignLandlordOrder,
    SignMineOwnerOrder,
    DeleteOrder,
} from '../../ui/actions';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';

const MineOperationOrder: FC<ContractProps> = ({ contract, accountName }) => {
    const roles = useStore(rolesStore) || [];
    const userRoles = useUserRoles(roles);
    const { isExecutorSigned, isClientSigned, isSelfSigned } =
        useContractType(contract);
    const { canDeleteOrder } = useOrderDelete(contract, accountName);
    const { canSignOperationLandlordOrder, canSignOperationMineOwnerOrder } =
        useOrderSign(contract, accountName, userRoles);

    return (
        <div>
            <StatusHeader
                contract={contract}
                extra={[
                    canSignOperationLandlordOrder && (
                        <SignLandlordOrder
                            contract={contract}
                            accountName={accountName}
                            isSelfContract={isSelfSigned}
                        />
                    ),

                    canSignOperationMineOwnerOrder && (
                        <SignMineOwnerOrder
                            contract={contract}
                            accountName={accountName}
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
                    {isClientSigned && (
                        <LandlordTable
                            contract={contract}
                            accountName={accountName}
                        />
                    )}

                    {isExecutorSigned && (
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

export { MineOperationOrder };
