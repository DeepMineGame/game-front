import React, { FC } from 'react';
import { Col, Row } from 'antd';

import { ConditionTable, GeneralDataTable, MineOwnerTable } from '../../ui';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';
import { StatusHeader } from '../../ui/status-header';
import { useContractButtons } from '../useContractButtons';

const MiningContract: FC<ContractProps> = ({ contract, accountName }) => {
    const buttons = useContractButtons(contract);
    return (
        <div>
            <StatusHeader contract={contract} extra={buttons} />
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
