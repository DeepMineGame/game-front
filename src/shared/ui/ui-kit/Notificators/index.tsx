import { notification } from 'antd';
import React from 'react';
import styles from './styles.module.scss';

export const errorNotify = (error: Error) => {
    notification.error({
        description: error.message,
        message: <span className={styles.errorNotificator}>Error</span>,
        placement: 'bottomRight',
        className: styles.errorNotificator,
    });
    return Promise.reject(error);
};
