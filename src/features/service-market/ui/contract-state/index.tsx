import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CheckCircleOutlined,
    CheckOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { OrderState, OrderSubState } from 'entities/smartcontract';
import { ContractProps } from '../../types';
import styles from './styles.module.scss';

export const ContractState: FC<ContractProps> = ({ contract }) => {
    const { t } = useTranslation();

    if (contract.computed?.status === OrderState.Completed) {
        return (
            <div className={styles.status}>
                <CheckCircleOutlined className={styles.completedIcon} />{' '}
                {t('pages.serviceMarket.contract.completed')}
            </div>
        );
    }

    if (contract.computed?.status === OrderState.WaitingForAction) {
        return (
            <div className={styles.status}>
                <ClockCircleOutlined className={styles.waitIcon} />{' '}
                {t('pages.serviceMarket.contract.waitingAction')}
            </div>
        );
    }

    if (
        contract.computed?.status === OrderState.Terminated &&
        contract.computed?.sub_status === OrderSubState.Closed
    )
        return (
            <div className={styles.status}>
                <DeleteOutlined /> {t('pages.serviceMarket.contract.deleted')}
            </div>
        );

    if (contract.computed?.status === OrderState.Terminated) {
        return (
            <div className={styles.status}>
                <CloseCircleOutlined className={styles.terminateIcon} />{' '}
                {t('pages.serviceMarket.contract.terminated')}
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
