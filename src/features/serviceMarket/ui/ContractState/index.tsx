import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CheckOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import {
    ContractStatesMeta,
    ContractStates,
    Status,
} from 'entities/smartcontract';
import styles from './styles.module.scss';

export const ContractState: FC<{ contractStatus: Status }> = ({
    contractStatus,
}) => {
    const { t } = useTranslation();

    const showPenalty = [
        ContractStatesMeta.deadlineViolation,
        ContractStatesMeta.termViolation,
        ContractStatesMeta.earlyBreak,
    ].includes(contractStatus.meta as ContractStatesMeta);

    if (contractStatus.value === ContractStates.completed) {
        return (
            <>
                <CheckCircleOutlined className={styles.completedIcon} />{' '}
                {t('pages.serviceMarket.contract.completed')}
            </>
        );
    }

    if (contractStatus.meta === ContractStatesMeta.complete) {
        return (
            <>
                <ClockCircleOutlined className={styles.waitIcon} />{' '}
                {t('pages.serviceMarket.contract.waitingAction')}
            </>
        );
    }

    if (contractStatus.value === ContractStates.terminated || showPenalty) {
        return (
            <>
                <CloseCircleOutlined className={styles.terminateIcon} />{' '}
                {t('pages.serviceMarket.contract.terminated')}
                {showPenalty && (
                    <ExclamationCircleFilled className={styles.warningIcon} />
                )}
            </>
        );
    }

    return (
        <>
            <CheckOutlined className={styles.checkIcon} />{' '}
            {t('pages.serviceMarket.contract.valid')}
        </>
    );
};
