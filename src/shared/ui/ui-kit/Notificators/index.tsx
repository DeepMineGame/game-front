import { notification } from 'antd';
import { isServerError } from '../../../lib/utils/is-server-error';
import styles from './styles.module.scss';

export const showErrorNotification = (error: Error) => {
    const e = error as Error & { response: { status: number } };

    if (isServerError(e)) {
        return Promise.reject(error);
    }

    notification.error({
        description: error.message,
        message: <span className={styles.errorNotificator}>Error</span>,
        placement: 'bottomRight',
        className: styles.errorNotificator,
    });
    return Promise.reject(error);
};
