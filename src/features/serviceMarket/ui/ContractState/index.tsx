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
            <div className={styles.status}>
                <CheckCircleOutlined className={styles.completedIcon} />{' '}
                {t('pages.serviceMarket.contract.completed')}
            </div>
        );
    }

    if (contractStatus.meta === ContractStatesMeta.complete) {
        return (
            <div className={styles.status}>
                <ClockCircleOutlined className={styles.waitIcon} />{' '}
                {t('pages.serviceMarket.contract.waitingAction')}
            </div>
        );
    }

    if (contractStatus.value === ContractStates.terminated || showPenalty) {
        return (
            <div className={styles.status}>
                <CloseCircleOutlined className={styles.terminateIcon} />{' '}
                {t('pages.serviceMarket.contract.terminated')}
                {showPenalty && (
                    <ExclamationCircleFilled className={styles.warningIcon} />
                )}
            </div>
        );
    }

    return (
        <div className={styles.status}>
            <CheckOutlined className={styles.checkIcon} />{' '}
            {t('pages.serviceMarket.contract.valid')}
        </div>
    );
};
