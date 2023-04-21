import React, { FC } from 'react';
import { Row, Col } from 'antd';

import { UpgradeReport } from 'shared';
import { Conditions, Citizen, Engineer, GeneralInfo } from '../../ui';
import { ContractProps } from '../../types';

import { StatusHeader } from '../../ui/status-header';
import { useSignButtons } from '../useSignButtons';
import { SignLevelUpgradeOrder } from '../../ui/actions';
// import { ContractAlerts } from './components/ContractAlerts';
import { useLevelUpgradeContract } from './constants';

const LevelUpgradeContract: FC<ContractProps> = ({ contract, accountName }) => {
    const { canGetReport } = useLevelUpgradeContract(contract, accountName);
    // const { canDeleteOrder } = useOrderDelete(contract, accountName);
    const buttons = useSignButtons({
        contract,
        clientSignButton: (
            <SignLevelUpgradeOrder
                contract={contract}
                accountName={accountName}
                asClient
            />
        ),
        executorSignButton: (
            <SignLevelUpgradeOrder
                contract={contract}
                accountName={accountName}
                asClient={false}
            />
        ),
    });

    return (
        <div>
            <StatusHeader
                contract={contract}
                extra={[
                    buttons,
                    // [
                    //     canTerminate && (
                    //         <TerminateContract
                    //             contractId={contract.id}
                    //             accountName={accountName}
                    //         />
                    //     ),
                    canGetReport && (
                        <UpgradeReport
                            accountName={accountName}
                            contract={contract}
                        />
                    ),
                    //     !canDeleteOrder &&
                    //         contract.computed?.status !==
                    //             OrderState.ValidContract && (
                    //             <SignLevelUpgradeOrder
                    //                 contract={contract}
                    //                 accountName={accountName}
                    //             />
                    //         ),
                    //     canDeleteOrder && (
                    //         <DeleteOrder
                    //             accountName={accountName}
                    //             contractId={contract.id}
                    //         />
                    //     ),
                    // ]
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

                        {/* <Col span={24}> */}
                        {/*    <ContractAlerts */}
                        {/*        contract={contract} */}
                        {/*        accountName={accountName} */}
                        {/*    /> */}
                        {/* </Col> */}
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
