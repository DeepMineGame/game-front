import { FC } from 'react';
import { Trans } from 'react-i18next';
import { Col, Row } from 'antd';
import { useContractState } from 'entities/contract';
import { Alert } from 'shared/ui';
import { Completed, DeleteOrder, TerminateContract } from '../../ui/actions';
import { GeneralDataTable, ConditionTable, MineOwnerTable } from '../../ui';
import { LandlordTable } from '../../ui/contract/mine-operation';
import { ContractProps } from '../../types';

const MineOperationContract: FC<ContractProps> = ({
    contract,
    accountName,
    isDeleted,
}) => {
    const {
        canTerminate,
        showCompleted,
        showTerminatedAlert,
        canDeleteSelfContract,
    } = useContractState(contract, accountName);

    return (
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
                            {showTerminatedAlert && (
                                <Alert
                                    message={
                                        <Trans i18nKey="pages.serviceMarket.contract.youTerminated" />
                                    }
                                    type="info"
                                    showIcon
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
                <LandlordTable contract={contract} accountName={accountName} />
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
    );
};

export { MineOperationContract };
