import React from 'react';
import './index.scss';
// import i18n (needs to be bundled ;))
import './index.i18n';
import { Routing } from 'pages';
import { withProviders } from './providers';

const App = () => {
    return <Routing />;
};
export * from './constants';
export default withProviders(App);
