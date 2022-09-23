import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Status, Title } from 'shared';
import { ID_TO_INVENTORY, InventoryIdType } from 'entities/smartcontract';
import styles from '../styles.module.scss';

export const CardState: FC<{
    templateId?: InventoryIdType;
    status?: Status;
    repairing?: boolean;
}> = ({ templateId, status, repairing }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.cardState}>
            <Title level={4}>
                {status === 'broken' && !repairing
                    ? `${ID_TO_INVENTORY[templateId!]} ${t(
                          'kit.cardStates.damaged'
                      )}`
                    : t('kit.cardStates.repairing')}
            </Title>
        </div>
    );
};
