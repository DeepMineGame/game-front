import React from 'react';
// import i18n (needs to be bundled ;))
import './index.i18n';
import 'antd/dist/antd.min.css';
import { Routing } from 'pages';
import axios from 'axios';
import './index.module.scss';
import { errorNotify } from 'shared';
import { withProviders } from './providers';

axios.interceptors.response.use((response) => response, errorNotify);

const App = () => {
    return <Routing />;
};

export default withProviders(App);
export * from './constants';
