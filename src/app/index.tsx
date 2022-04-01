import React from 'react';
import './index.scss';
import { Routing } from 'pages';
import { withProviders } from './providers';

function App() {
    return <Routing />;
}

export default withProviders(App);
