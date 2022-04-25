import React from 'react';
import './index.scss';
// import i18n (needs to be bundled ;))
import './index.i18n';
import { Routing } from 'pages';
import axios from 'axios';
import { withProviders } from './providers';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        // TODO: заменить алерт в рамках https://trello.com/c/Wh8ULda5/526-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-%D0%B4%D0%B5%D1%84%D0%BE%D0%BB%D1%82%D0%BD%D1%83%D1%8E-%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83-%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA
        // eslint-disable-next-line no-alert
        alert(error);
        return Promise.reject(error);
    }
);

const App = () => {
    return <Routing />;
};

export * from './constants';
export default withProviders(App);
