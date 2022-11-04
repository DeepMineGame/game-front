// import i18n (needs to be bundled ;))
import './index.i18n';
import './app.less';
import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { showErrorNotification } from 'shared';
import { withProviders } from './providers';
import { Router } from './router';
import './index.module.scss';

Sentry.init({
    dsn: 'https://aab6d968ce3a4d45a849c28fd4113a35@o1316928.ingest.sentry.io/4503981295861760',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (!error.config.url?.includes('/ubs/auth/me'))
            showErrorNotification(error);
    }
);

const App = () => {
    return <Router />;
};

export default withProviders(App);
export * from './constants';
