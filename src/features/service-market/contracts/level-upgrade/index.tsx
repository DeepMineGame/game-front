import React, { FC } from 'react';
import { Row, Col } from 'antd';
import { useOrderDelete } from 'entities/order';
import { UpgradeReport } from 'shared/ui';
import { Conditions, Citizen, Engineer, GeneralInfo } from '../../ui';
import { ContractProps } from '../../types';
import {
    DeleteOrder,
    SignLevelUpgradeOrder,
    TerminateContract,
} from '../../ui/actions';
import { StatusHeader } from '../../ui/status-header';
import { ContractAlerts } from './components/ContractAlerts';
import { useLevelUpgradeContract } from './constants';

const LevelUpgradeContract: FC<ContractProps> = ({ contract, accountName }) => {
    const { canTerminate, canGetReport } = useLevelUpgradeContract(
        contract,
        accountName
    );
    const { canDeleteOrder } = useOrderDelete(contract, accountName);

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
                    canGetReport && (
                        <UpgradeReport
                            accountName={accountName}
                            contract={contract}
                        />
                    ),
                    !canDeleteOrder && (
                        <SignLevelUpgradeOrder
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
                <Col xs={24} md={12}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <GeneralInfo
                                contract={contract}
                                accountName={accountName}
                            />
                        </Col>

                        <Col span={24}>
                            <ContractAlerts
                                contract={contract}
                                accountName={accountName}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <Conditions contract={contract} />
                </Col>
                <Col xs={24} md={12}>
                    <Engineer contract={contract} accountName={accountName} />
                </Col>
                <Col xs={24} md={12}>
                    <Row gutter={[32, 32]}>
                        <Col span={24}>
                            <Citizen
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

export { LevelUpgradeContract };
