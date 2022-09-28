import { FC } from 'react';
import { Row, Col } from 'antd';
import { useContractState } from 'entities/contract';
import {
    Conditions,
    Citizen,
    Engineer,
    GeneralInfo,
} from '../../ui/contract/level-upgrade';
import { TerminateContract } from '../../ui/actions';
import { ContractProps } from '../../types';

const LevelUpgradeContract: FC<ContractProps> = ({ contract, accountName }) => {
    const { canTerminate } = useContractState(contract, accountName);

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
                                    penalty={contract.penalty_amount}
                                    contractId={contract.id}
                                    accountName={accountName}
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
