import React from 'react';
// import i18n (needs to be bundled ;))
import './index.i18n';
import 'antd/dist/antd.min.css';
import axios from 'axios';

import { errorNotify } from 'shared';
import { withProviders } from './providers';
import { Router } from './router';

import './index.module.scss';

axios.interceptors.response.use((response) => response, errorNotify);

const App = () => {
    return <Router />;
};

export * from './constants';
export default withProviders(App);
