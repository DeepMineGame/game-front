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
    finishesAt: number;
    onFinish?: () => void;
}> = ({ status, finishesAt, onFinish }) => {
    const { t } = useTranslation();
    useTick(!isUtcDateExpired(finishesAt));

    const isBrokenAndNotInRepair =
        isUtcDateExpired(finishesAt) && status === Status.broken;

    if (onFinish && status !== Status.broken && isUtcDateExpired(finishesAt))
        onFinish();

    return (
        <div className={styles.stateWrapper}>
            <div className={styles.cardState}>
                {!isBrokenAndNotInRepair ? (
                    <ToolOutlined className={styles.iconTool} />
                ) : (
                    <BrokenOutlined />
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
