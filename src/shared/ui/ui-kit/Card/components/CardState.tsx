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
    useTick(status === Status.broken);

    if (finishesAt && onFinish && isUtcDateExpired(finishesAt)) onFinish();

    return (
        <div className={styles.stateWrapper}>
            <div className={styles.cardState}>
                {status === Status.broken && !finishesAt && <BrokenOutlined />}
                {status === Status.broken && finishesAt && (
                    <ToolOutlined className={styles.iconTool} />
                )}
                <Text type="secondary">
                    {status === Status.broken && !finishesAt
                        ? t('kit.cardStates.broken')
                        : getTimeLeftFromUtc(finishesAt!)}
                </Text>
            </div>
        </div>
    );
};
