import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { prop } from 'shared';
import { OrderState, OrderSubState } from 'entities/smartcontract';
import {
    CompletedButton,
    DeleteOrder,
    SignLandlordOrder,
    SignMineOwnerOrder,
    TerminateContract,
} from '../../ui/actions';
import { GeneralDataTable, ConditionTable, MineOwnerTable } from '../../ui';
import { LandlordTable } from '../../ui/contract/mine-operation';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';

const MineOperationContract: FC<ContractProps> = ({
    contract,
    accountName,
}) => {
    const isClientEmpty = contract.client === '';
    const terminateButton = (
        <TerminateContract contractId={contract.id} accountName={accountName} />
    );
    const completeButton = (
        <CompletedButton contractId={contract.id} accountName={accountName} />
    );
    const deleteButton = (
        <DeleteOrder accountName={accountName} contractId={contract.id} />
    );
    const isUserInvolved =
        contract.client === accountName || contract.executor === accountName;

    const isSelfSigned = contract.client === contract.executor;
    const buttonsMap = {
        [OrderState.WaitingForAction]: {
            [OrderSubState.PrematureTerminated]: deleteButton,
            [OrderSubState.ViolateTerms]: completeButton,
            [OrderSubState.Completed]: isUserInvolved && completeButton,
        },
        [OrderState.ValidContract]: {
            [OrderSubState.Active]: terminateButton,
        },
        [OrderState.OpenOrder]: {
            [OrderSubState.Unsigned]: [
                deleteButton,
                isClientEmpty ? (
                    <SignMineOwnerOrder
                        contract={contract}
                        accountName={accountName}
                    />
                ) : (
                    <SignLandlordOrder
                        contract={contract}
                        accountName={accountName}
                        isSelfContract={isSelfSigned}
                    />
                ),
            ],
        },
    };

    const buttonsForStateSet =
        contract.computed?.status &&
        prop(contract.computed?.status, buttonsMap);
    const buttons = prop(
        contract.computed?.sub_status || '',
        buttonsForStateSet
    );

    return (
        <div>
            <StatusHeader contract={contract} extra={[buttons]} />
            <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <GeneralDataTable
                                contract={contract}
                                accountName={accountName}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <ConditionTable contract={contract} />
                </Col>
                <Col xs={24} md={12}>
                    <LandlordTable
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
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export { MineOperationContract };
