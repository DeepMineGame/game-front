import { FC } from 'react';
import { Trans } from 'react-i18next';
import { Col, Row } from 'antd';
import { Penalty } from 'features';
import { ContractStatesMeta } from 'entities/smartcontract';
import { useContractState } from 'entities/contract';
import { Alert } from 'shared/ui';
import { Completed, TerminateContract } from '../../ui/actions';
import {
    GeneralDataTable,
    ConditionTable,
    MineOwnerTable,
} from '../../ui/contract';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';

const MiningContract: FC<ContractProps> = ({ contract, accountName }) => {
    const {
        stateMeta,
        canTerminate,
        showCompleted,
        showTerminatedAlert,
        showPenalty,
    } = useContractState(contract, accountName);

    return (
        <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
                <GeneralDataTable
                    contract={contract}
                    accountName={accountName}
                />

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
                            stateMeta === ContractStatesMeta.termViolation ||
                            stateMeta === ContractStatesMeta.deadlineViolation
                        }
                        penalty={contract.penalty_amount}
                        contractId={contract.id}
                    />
                )}
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

export { MiningContract };