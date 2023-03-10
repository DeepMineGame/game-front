import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { prop } from 'shared';
import { OrderState, OrderSubState } from 'entities/smartcontract';
import {
    CompletedButton,
    DeleteOrder,
    TerminateContract,
} from '../../ui/actions';
import { GeneralDataTable, ConditionTable, MineOwnerTable } from '../../ui';
import { LandlordTable } from '../../ui/contract/mine-operation';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';

const MineOperationContract: FC<ContractProps> = ({
    contract,
    accountName,
    // isDeleted,
}) => {
    // const { showCompleted } = useContractState(contract, accountName);
    const terminateButton = (
        <TerminateContract contractId={contract.id} accountName={accountName} />
    );
    const completeButton = (
        <CompletedButton contractId={contract.id} accountName={accountName} />
    );
    const buttonsMap = {
        [OrderState.WaitingForAction]: {
            [OrderSubState.PrematureTerminated]: terminateButton,
            [OrderSubState.ViolateTerms]: completeButton,
            [OrderSubState.Completed]: completeButton,
        },
        [OrderState.ValidContract]: {
            [OrderSubState.Active]: terminateButton,
        },
        [OrderState.OpenOrder]: {
            [OrderSubState.Unsigned]: (
                <DeleteOrder
                    accountName={accountName}
                    contractId={contract.id}
                />
            ),
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
                        {/* {!isDeleted && ( */}
                        {/*    <Col span={24}> */}
                        {/*        {showCompleted && ( */}
                        {/*            <CompletedAlert */}
                        {/*                accountName={accountName} */}
                        {/*                contractId={contract.id} */}
                        {/*            /> */}
                        {/*        )} */}
                        {/*    </Col> */}
                        {/* )} */}
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
