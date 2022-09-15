import { FC } from 'react';
import { Row, Col } from 'antd';
import { Alert } from 'shared';
import { Trans } from 'react-i18next';
import { Penalty } from 'features';
import { ContractStatesMeta } from 'entities/smartcontract';
import { useContractState } from 'entities/contract';
import {
    Conditions,
    Citizen,
    Engineer,
    GeneralInfo,
} from '../../ui/contract/level-upgrade';
import { Completed, TerminateContract } from '../../ui/actions';
import { ContractProps } from '../../types';

const LevelUpgradeContract: FC<ContractProps> = ({ contract, accountName }) => {
    const {
        canTerminate,
        showCompleted,
        showTerminatedAlert,
        showPenalty,
        stateMeta,
    } = useContractState(contract, accountName);

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
                        {showPenalty && (
                            <Penalty
                                isViolated={
                                    stateMeta ===
                                        ContractStatesMeta.termViolation ||
                                    stateMeta ===
                                        ContractStatesMeta.deadlineViolation
                                }
                                penalty={contract.penalty_amount}
                                contractId={contract.id}
                            />
                        )}
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
