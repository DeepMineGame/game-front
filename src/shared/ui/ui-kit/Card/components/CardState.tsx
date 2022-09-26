import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    getTimeLeftFromUtc,
    isUtcDateExpired,
    Status,
    Title,
    useTick,
} from 'shared';
import { ID_TO_INVENTORY, InventoryIdType } from 'entities/smartcontract';
import styles from '../styles.module.scss';

export const CardState: FC<{
    templateId?: InventoryIdType;
    status?: Status;
    finishesAt?: number;
    onFinish?: () => void;
}> = ({ templateId, status, finishesAt, onFinish }) => {
    const { t } = useTranslation();
    useTick(status === Status.broken);

    if (finishesAt && onFinish && isUtcDateExpired(finishesAt)) onFinish();

    return (
        <div className={styles.cardState}>
            <Title level={4}>
                {status === Status.broken && !finishesAt
                    ? `${ID_TO_INVENTORY[templateId!]} ${t(
                          'kit.cardStates.damaged'
                      )}`
                    : `${t('kit.cardStates.repairing')} ${getTimeLeftFromUtc(
                          finishesAt!
                      )}`}
            </Title>
        </div>
    );
};
