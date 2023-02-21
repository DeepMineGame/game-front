import { FC } from 'react';
import { Row, Col } from 'antd';
import { UpgradeReport } from 'shared/ui';
import { Conditions, Citizen, Engineer, GeneralInfo } from '../../ui';
import { ContractProps } from '../../types';
import { TerminateContract } from '../../ui/actions';
import { ContractAlerts } from './components/ContractAlerts';
import { useLevelUpgradeContract } from './constants';

const LevelUpgradeContract: FC<ContractProps> = ({ contract, accountName }) => {
    const { canTerminate, canGetReport } = useLevelUpgradeContract(
        contract,
        accountName
    );

    return (
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
                    <Col span={24}>
                        <Row justify="end">
                            {canTerminate && (
                                <TerminateContract
                                    contractId={contract.id}
                                    accountName={accountName}
                                />
                            )}
                            {canGetReport && (
                                <UpgradeReport
                                    accountName={accountName}
                                    contract={contract}
                                />
                            )}
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export { LevelUpgradeContract };
