import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import { Col, Row } from 'antd';
import { Penalty } from 'features';
import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';
import { Alert, DAY_IN_SECONDS } from 'shared/ui';
import { TerminateContract } from '../ui';
import { GeneralDataTable } from './ui/GeneralDataTable';
import { ConditionTable } from './ui/ConditionsTable';
import { LandlordTable } from './ui/LandlordTable';
import { MineOwnerTable } from './ui/MineownerTable';
import { ContractorTable } from './ui/ContractorTable';
import styles from './styles.module.scss';

type Props = { contract: ContractDto; accountName: string };

const getPenaltyDays = (
    feeDays: { key: number; value: number }[],
    daysPassed: number,
    feeDailyMinAmount: number
) => {
    const penaltyDays = [...Array(daysPassed).keys()].reduce((penalty, day) => {
        const workDay = feeDays[day]?.key;

        if (!feeDays[day]) penalty++;
        if (workDay > day) penalty++;
        if (workDay === day && feeDays[day]?.value < feeDailyMinAmount)
            penalty++;

        return penalty;
    }, 0);

    return penaltyDays;
};

const checkMiningTerms = (contract: ContractDto) => {
    const { days_for_penalty, fee_daily_min_amount, fee_days, start_time } =
        contract;
    if (!start_time) return false;

    const daysPassed = Math.floor(
        (Date.now() - start_time * 1000) / (DAY_IN_SECONDS * 1000)
    );

    const penaltyDays = getPenaltyDays(
        fee_days,
        daysPassed,
        fee_daily_min_amount
    );

    return penaltyDays >= days_for_penalty;
};

const isDeadlineExpired = (contract: ContractDto) => {
    return (
        contract.start_time === 0 && Date.now() >= contract.deadline_time * 1000
    );
};

const Contract: FC<Props> = ({ contract, accountName }) => {
    const isMiningContract =
        contract.type === ContractType.mineowner_contractor;
    const isContractMember =
        contract.client === accountName || contract.executor === accountName;
    const isTermInitiator = contract.term_initiator === accountName;

    const expiredDeadline = isDeadlineExpired(contract);
    const miningTermNotFulfilled = checkMiningTerms(contract);

    const showPenaltyForViolatedContract =
        contract.client === accountName &&
        (expiredDeadline || miningTermNotFulfilled);
    const showPenaltyForTerminatedContract =
        contract.status === ContractStatus.terminated &&
        isContractMember &&
        !isTermInitiator;

    const showPenalty =
        showPenaltyForViolatedContract || showPenaltyForTerminatedContract;

    return (
        <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
                <GeneralDataTable contract={contract} />
                {isTermInitiator && (
                    <Alert
                        className={styles.terminateAlert}
                        message={
                            <Trans i18nKey="pages.serviceMarket.contract.youTerminated" />
                        }
                        type="info"
                        showIcon
                    />
                )}
                {showPenalty && (
                    <Penalty
                        isViolated={showPenaltyForViolatedContract}
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
                    {!showPenalty &&
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
