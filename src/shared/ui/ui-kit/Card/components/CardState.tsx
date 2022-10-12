import { ToolOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    getTimeLeftFromUtc,
    isUtcDateExpired,
    Status,
    useTick,
    Text,
    BrokenOutlined,
} from 'shared';
import styles from '../styles.module.scss';

export const CardState: FC<{
    status?: Status;
    finishesAt?: number;
    onFinish?: () => void;
}> = ({ status, finishesAt, onFinish }) => {
    const { t } = useTranslation();
    useTick(finishesAt !== undefined && !isUtcDateExpired(finishesAt));

    const isBrokenAndNotInRepair =
        finishesAt !== undefined &&
        isUtcDateExpired(finishesAt) &&
        status === Status.broken;

    if (
        onFinish &&
        finishesAt !== undefined &&
        status !== Status.broken &&
        isUtcDateExpired(finishesAt)
    )
        onFinish();

    return (
        <div className={styles.stateWrapper}>
            <div className={styles.cardState}>
                {isBrokenAndNotInRepair ? (
                    <BrokenOutlined />
                ) : (
                    <ToolOutlined className={styles.iconTool} />
                )}
                <Text type="secondary">
                    {isBrokenAndNotInRepair
                        ? t('kit.cardStates.broken')
                        : getTimeLeftFromUtc(finishesAt!)}
                </Text>
            </div>
        </div>
    );
};
