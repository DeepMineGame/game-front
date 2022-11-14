import { FC } from 'react';
import { Col, Row } from 'antd';
import { useContractState } from 'entities/contract';
import { getDmeAmount } from 'shared/lib/utils';
import { TerminateContract } from '../../ui/actions';
import {
    GeneralDataTable,
    ConditionTable,
    MineOwnerTable,
} from '../../ui/contract';
import { ContractorTable } from '../../ui/contract/mining';
import { ContractProps } from '../../types';
import { ContractAlert } from '../components/contract-alert';

const MiningContract: FC<ContractProps> = ({ contract, accountName }) => {
    const { canTerminate } = useContractState(contract, accountName);

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
                    <ContractAlert
                        contract={contract}
                        accountName={accountName}
                    />
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

export { MiningContract };
