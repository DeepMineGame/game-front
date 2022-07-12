import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { Penalty } from 'features';
import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';
import { TerminateContract } from '../ui';
import styles from './styles.module.scss';
import { GeneralDataTable } from './ui/GeneralDataTable';
import { ConditionTable } from './ui/ConditionsTable';
import { LandlordTable } from './ui/LandlordTable';
import { MineOwnerTable } from './ui/MineownerTable';
import { ContractorTable } from './ui/ContractorTable';

type Props = { contract: ContractDto; accountName: string };

const Contract: FC<Props> = ({ contract, accountName }) => {
    const isMiningContract =
        contract.type === ContractType.mineowner_contractor;
    const isContractMember =
        contract.client === accountName || contract.executor === accountName;

    return (
        <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
                <GeneralDataTable contract={contract} />
                {contract.status === ContractStatus.terminated &&
                    isContractMember &&
                    contract.term_initiator !== accountName && (
                        <Penalty
                            penalty={contract.penalty_amount}
                            contractId={contract.id}
                        />
                    )}
            </Col>
            <Col xs={24} md={12}>
                <ConditionTable contract={contract} />
            </Col>
            <Col xs={24} md={12}>
                {isMiningContract ? (
                    <ContractorTable
                        contract={contract}
                        accountName={accountName}
                    />
                ) : (
                    <LandlordTable
                        contract={contract}
                        accountName={accountName}
                    />
                )}
            </Col>

            <Col xs={24} md={12}>
                <MineOwnerTable
                    isMiningContract={isMiningContract}
                    contract={contract}
                    accountName={accountName}
                />

                <div className={styles.bottomActions}>
                    {contract.status === ContractStatus.active &&
                        isContractMember && (
                            <TerminateContract
                                penalty={contract.penalty_amount}
                                contractId={contract.id}
                                accountName={accountName}
                            />
                        )}
                </div>
            </Col>
        </Row>
    );
};

export { Contract };
