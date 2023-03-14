import React, { FC } from 'react';
import { Col, Row } from 'antd';

import { prop } from 'shared';
import { OrderState, OrderSubState } from 'entities/smartcontract';
import {
    CompletedButton,
    DeleteOrder,
    SignContractorOrder,
    SignMineOwnerContractorOrder,
    TerminateContract,
} from '../../ui/actions';
import { ConditionTable, GeneralDataTable, MineOwnerTable } from '../../ui';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';

const MiningContract: FC<ContractProps> = ({ contract, accountName }) => {
    const isSelfSignedContract = contract.executor === contract.client;

    const terminateButton = (
        <TerminateContract contractId={contract.id} accountName={accountName} />
    );
    const completeButton = (
        <CompletedButton contractId={contract.id} accountName={accountName} />
    );
    const deleteButton = (
        <DeleteOrder accountName={accountName} contractId={contract.id} />
    );

    const isClientEmpty = contract.client === '';
    const isCurrentUserClientOrExecutor =
        contract.client === accountName || contract.executor === accountName;

    const buttonsMap = {
        [OrderState.OpenOrder]: {
            [OrderSubState.undefined]:
                isCurrentUserClientOrExecutor && deleteButton,
            [OrderSubState.Unsigned]: [
                isClientEmpty ? (
                    <SignContractorOrder
                        contract={contract}
                        accountName={accountName}
                    />
                ) : (
                    <SignMineOwnerContractorOrder
                        contract={contract}
                        accountName={accountName}
                        isSelfContract={false}
                    />
                ),
                isCurrentUserClientOrExecutor && deleteButton,
            ],
        },
        [OrderState.ValidContract]: {
            [OrderSubState.undefined]: terminateButton,
            [OrderSubState.Active]: terminateButton,
        },

        [OrderState.WaitingForAction]: {
            [OrderSubState.undefined]: completeButton,
            [OrderSubState.PrematureTerminated]: terminateButton,
        },
    };

    const selfSignedButtonMap = {
        [OrderState.OpenOrder]: {
            [OrderSubState.Unsigned]: [
                contract.executor ? (
                    <SignMineOwnerContractorOrder
                        contract={contract}
                        accountName={accountName}
                        isSelfContract
                    />
                ) : (
                    <SignContractorOrder
                        contract={contract}
                        accountName={accountName}
                    />
                ),
                deleteButton,
            ],
        },
        [OrderState.ValidContract]: {
            [OrderSubState.undefined]: terminateButton,
            [OrderSubState.Active]: terminateButton,
        },

        [OrderState.WaitingForAction]: {
            [OrderSubState.undefined]: completeButton,
            [OrderSubState.Completed]: completeButton,
            [OrderSubState.Active]: terminateButton,
            [OrderSubState.PrematureTerminated]: deleteButton,
        },
        [OrderState.Terminated]: {
            [OrderSubState.PrematureTerminated]: deleteButton,
        },
    };

    const buttonsForStateSet =
        contract.computed?.status &&
        prop(
            contract.computed?.status,
            isSelfSignedContract ? selfSignedButtonMap : buttonsMap
        );
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
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export { MiningContract };
