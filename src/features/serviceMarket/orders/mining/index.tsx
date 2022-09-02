import { FC } from 'react';
import { Row, Col } from 'antd';
import { useOrderDelete, useOrderSign } from 'entities/order';
import { useContractType } from 'entities/contract';
import {
    ConditionTable,
    MineOwnerTable,
    GeneralDataTable,
} from '../../ui/contract';
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
    const { isExecutorSigned, isClientSigned } = useContractType(contract);

    return (
        <div>
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

                        <Col span={24}>
                            <Row justify="end">
                                {canSignMiningContractorOrder && (
                                    <SignContractorOrder
                                        contract={contract}
                                        accountName={accountName}
                                    />
                                )}
                                {canSignMiningMineOwnerOrder && (
                                    <SignMineOwnerContractorOrder
                                        contract={contract}
                                        accountName={accountName}
                                    />
                                )}

                                {canDeleteOrder && (
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

export { MiningOrder };
