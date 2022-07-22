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
import { Completed, TerminateContract } from '../ui';
import { GeneralDataTable } from './ui/GeneralDataTable';
import { ConditionTable } from './ui/ConditionsTable';
import { LandlordTable } from './ui/LandlordTable';
import { MineOwnerTable } from './ui/MineownerTable';
import { ContractorTable } from './ui/ContractorTable';
import styles from './styles.module.scss';

type Props = { contract: ContractDto; accountName: string };

const getMissedDays = (
    feeDays: { key: number; value: number }[],
    daysPassed: number,
    feeDailyMinAmount: number
) => {
    const missedDays = [...Array(daysPassed).keys()].reduce((penalty, day) => {
        const workDay = feeDays[day]?.key;

        if (!feeDays[day]) penalty++;
        if (workDay > day) penalty++;
        if (workDay === day && feeDays[day]?.value < feeDailyMinAmount)
            penalty++;

        return penalty;
    }, 0);

    return missedDays;
};

const isContractTermNotFulfilled = (contract: ContractDto) => {
    const {
        days_for_penalty,
        penalty_amount,
        fee_daily_min_amount,
        fee_days,
        start_time,
        finishes_at,
    } = contract;
    if (!start_time) return false;
    if (!penalty_amount) return false;
    if (!days_for_penalty) return false;

    const currentTime = Date.now();
    const finishesAt = finishes_at * 1000;
    const finishTime = finishesAt < currentTime ? finishesAt : currentTime;
    const daysPassed = (finishTime - start_time * 1000) / DAY_IN_SECONDS;

    const missedDays = getMissedDays(
        fee_days,
        daysPassed,
        fee_daily_min_amount
    );

    return missedDays >= days_for_penalty;
};

const isDeadlineExpired = (contract: ContractDto) => {
    return (
        contract.start_time === 0 && Date.now() >= contract.deadline_time * 1000
    );
};

const checkCompleteStatus = (contract: ContractDto) => {
    const isActiveOrdTerminated =
        contract.status === ContractStatus.active ||
        contract.status === ContractStatus.terminated;
    const isFinished = contract.finishes_at * 1000 < Date.now();
    const isTermFullFilled = !isContractTermNotFulfilled(contract);

    return isActiveOrdTerminated && isFinished && isTermFullFilled;
};

const Contract: FC<Props> = ({ contract, accountName }) => {
    const isClient = contract.client === accountName;
    const isMiningContract =
        contract.type === ContractType.mineowner_contractor;
    const isContractMember = isClient || contract.executor === accountName;
    const isTermInitiator = contract.term_initiator === accountName;

    const expiredDeadline = isDeadlineExpired(contract);
    const miningTermNotFulfilled = isContractTermNotFulfilled(contract);

    const showPenaltyForViolatedContract =
        isClient && (expiredDeadline || miningTermNotFulfilled);
    const showPenaltyForTerminatedContract =
        contract.status === ContractStatus.terminated &&
        isContractMember &&
        !isTermInitiator;

    const hasPenalty =
        showPenaltyForViolatedContract || showPenaltyForTerminatedContract;

    const isCompleted = checkCompleteStatus(contract);

    return (
        <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
                <GeneralDataTable contract={contract} />
                {isCompleted && (
                    <Completed
                        accountName={accountName}
                        contractId={contract.id}
                    />
                )}
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
                {hasPenalty && (
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
                    {!hasPenalty &&
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
