import { FC } from 'react';
import { Trans } from 'react-i18next';
import { Col, Row } from 'antd';
import { PenaltyActions } from 'features';
import { ContractStatesMeta } from 'entities/smartcontract';
import { TerminateState, useContractState } from 'entities/contract';
import { Alert } from 'shared/ui';
import { fromUnit, getDmeAmount } from 'shared/lib/utils';
import { Completed, TerminateContract } from '../../ui/actions';
import {
    GeneralDataTable,
    ConditionTable,
    MineOwnerTable,
} from '../../ui/contract';
import { LandlordTable } from '../../ui/contract/mine-operation';
import { ContractProps } from '../../types';

const MineOperationContract: FC<ContractProps> = ({
    contract,
    accountName,
}) => {
    const {
        stateMeta,
        canTerminate,
        showCompleted,
        showTerminatedAlert,
        showPenaltyActions,
        terminateState,
        isCompleted,
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
                    <Col span={24}>
                        {showCompleted && (
                            <Completed
                                accountName={accountName}
                                contractId={contract.id}
                            />
                        )}
                        {isCompleted && (
                            <Alert
                                message={
                                    <Trans
                                        i18nKey="pages.serviceMarket.contract.completedContract"
                                        values={{
                                            amount: fromUnit(
                                                contract.penalty_amount
                                            ),
                                        }}
                                    />
                                }
                                type="info"
                                showIcon
                            />
                        )}
                        {showTerminatedAlert &&
                            terminateState !== TerminateState.undefined && (
                                <Alert
                                    message={
                                        <Trans
                                            i18nKey={`pages.serviceMarket.contract.${terminateState}`}
                                            values={{
                                                amount: fromUnit(
                                                    contract.penalty_amount
                                                ),
                                            }}
                                        />
                                    }
                                    type="info"
                                    showIcon
                                />
                            )}
                        {showPenaltyActions && (
                            <PenaltyActions
                                isViolated={
                                    stateMeta ===
                                        ContractStatesMeta.termViolation ||
                                    stateMeta ===
                                        ContractStatesMeta.deadlineViolation
                                }
                                amount={getDmeAmount(contract.penalty_amount)}
                                contractId={contract.id}
                            />
                        )}
                    </Col>
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
                                    penalty={getDmeAmount(
                                        contract.penalty_amount
                                    )}
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

export { MineOperationContract };
