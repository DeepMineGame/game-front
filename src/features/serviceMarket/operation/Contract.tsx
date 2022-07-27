import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import { Col, Row } from 'antd';
import { Penalty } from 'features';
import {
    ContractDto,
    ContractStates,
    ContractStatesMeta,
    ContractStatus,
    ContractType,
    getContractStatus,
} from 'entities/smartcontract';
import { Alert } from 'shared/ui';
import { Completed, TerminateContract } from '../ui';
import { GeneralDataTable } from './ui/GeneralDataTable';
import { ConditionTable } from './ui/ConditionsTable';
import { LandlordTable } from './ui/LandlordTable';
import { MineOwnerTable } from './ui/MineownerTable';
import { ContractorTable } from './ui/ContractorTable';
import styles from './styles.module.scss';

type Props = { contract: ContractDto; accountName: string };

const Contract: FC<Props> = ({ contract, accountName }) => {
    const isClient = contract.client === accountName;
    const isMiningContract =
        contract.type === ContractType.mineowner_contractor;
    const isContractMember = isClient || contract.executor === accountName;

    const { value: status, meta: statusMeta } = getContractStatus(
        contract,
        accountName
    );

    const showPenalty = [
        ContractStatesMeta.deadlineViolation,
        ContractStatesMeta.termViolation,
        ContractStatesMeta.earlyBreak,
    ].includes(statusMeta as ContractStatesMeta);

    const isComplete = statusMeta === ContractStatesMeta.complete;

    return (
        <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
                <GeneralDataTable
                    contract={contract}
                    accountName={accountName}
                />
                {isComplete && isContractMember && (
                    <Completed
                        accountName={accountName}
                        contractId={contract.id}
                    />
                )}
                {status === ContractStates.terminated && isContractMember && (
                    <Alert
                        className={styles.terminateAlert}
                        message={
                            <Trans i18nKey="pages.serviceMarket.contract.youTerminated" />
                        }
                        type="info"
                        showIcon
                    />
                )}
                {showPenalty && isContractMember && (
                    <Penalty
                        isViolated={
                            statusMeta === ContractStatesMeta.termViolation ||
                            statusMeta === ContractStatesMeta.deadlineViolation
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
                    {!isComplete &&
                        !showPenalty &&
                        contract.status === ContractStatus.active &&
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
