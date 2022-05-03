import React from 'react';
// import i18n (needs to be bundled ;))
import './index.i18n';
import 'antd/dist/antd.min.css';
import { Routing } from 'pages';
import axios from 'axios';
import { notification } from 'antd';
import styles from './index.module.scss';
import { withProviders } from './providers';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        notification.error({
            description: error.message,
            message: <span className={styles.errorNotificator}>Error</span>,
            placement: 'bottomRight',
            className: styles.errorNotificator,
        });
        return Promise.reject(error);
    }
);

const App = () => {
    return <Routing />;
};

export * from './constants';
export default withProviders(App);
