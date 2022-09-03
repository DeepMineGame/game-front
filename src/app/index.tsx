// import i18n (needs to be bundled ;))
import './index.i18n';
import './app.less';
import axios, { AxiosError } from 'axios';

import { errorNotify } from 'shared';
import { withProviders } from './providers';
import { Router } from './router';
import './index.module.scss';

axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (!error.config.url?.includes('/ubs/auth/me')) errorNotify(error);
    }
);

const App = () => {
    return <Router />;
};

export default withProviders(App);
export * from './constants';
