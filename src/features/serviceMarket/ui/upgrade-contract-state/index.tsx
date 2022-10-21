import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CheckOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleFilled,
    DeleteOutlined,
} from '@ant-design/icons';
import { useContractType } from 'entities/contract';
import { ContractProps } from '../../types';
import { useLevelUpgradeContract } from '../../contracts/level-upgrade/constants';
import styles from './styles.module.scss';

export const UpgradeContractState: FC<ContractProps> = ({
    contract,
    accountName,
}) => {
    const { t } = useTranslation();

    const {
        isDeleted,
        isTerminatedStatus,
        isCompleted,
        isNeedComplete,
        isTermViolation,
    } = useLevelUpgradeContract(contract, accountName);

    const { isOrder } = useContractType(contract);

    if (isCompleted) {
        return (
            <div className={styles.status}>
                <CheckCircleOutlined className={styles.completedIcon} />{' '}
                {t('pages.serviceMarket.contract.completed')}
            </div>
        );
    }

    if (isNeedComplete) {
        return (
            <div className={styles.status}>
                <ClockCircleOutlined className={styles.waitIcon} />{' '}
                {t('pages.serviceMarket.contract.waitingAction')}
            </div>
        );
    }

    if (isTerminatedStatus || isTermViolation) {
        return (
            <div className={styles.status}>
                <CloseCircleOutlined className={styles.terminateIcon} />{' '}
                {t('pages.serviceMarket.contract.terminated')}
                {!isTerminatedStatus && isTermViolation && (
                    <ExclamationCircleFilled className={styles.warningIcon} />
                )}
            </div>
        );
    }

    if (isDeleted && isOrder)
        return (
            <div className={styles.status}>
                <DeleteOutlined /> {t('pages.serviceMarket.contract.deleted')}
            </div>
        );

    return (
        <div className={styles.status}>
            <CheckOutlined className={styles.checkIcon} />{' '}
            {t('pages.serviceMarket.contract.valid')}
        </div>
    );
};
