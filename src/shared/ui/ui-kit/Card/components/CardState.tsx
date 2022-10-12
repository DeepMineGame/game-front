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
    const isFinishesAtExist = finishesAt !== undefined;
    useTick(isFinishesAtExist && !isUtcDateExpired(finishesAt));

    const isBrokenAndNotInRepair =
        isFinishesAtExist &&
        isUtcDateExpired(finishesAt) &&
        status === Status.broken;

    if (
        onFinish &&
        isFinishesAtExist &&
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
