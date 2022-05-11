import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from 'antd';
import styles from '../styles.module.scss';
import { Status } from '..';

type Props = {
    status?: Status;
};

export const CardBadge: FC<Props> = ({ status }) => {
    const { t } = useTranslation();

    switch (status) {
        case 'installed':
            return (
                <Badge
                    className={styles.status}
                    status="success"
                    text={t('kit.statuses.installed')}
                />
            );
        case 'broken':
            return (
                <Badge
                    className={styles.status}
                    status="error"
                    text={t('kit.statuses.broken')}
                />
            );
        case 'notInstalled':
            return (
                <Badge
                    className={styles.status}
                    status="default"
                    text={t('kit.statuses.notInstalled')}
                />
            );

        default:
            return (
                <Badge
                    className={styles.status}
                    status="default"
                    text={t('kit.statuses.default')}
                />
            );
    }
};
