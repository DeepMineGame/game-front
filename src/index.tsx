import React from 'react';
import ReactDOMClient from 'react-dom/client';

import App from './app';

const root = ReactDOMClient.createRoot(
    document.getElementById('root') as Element
);

root.render(<App />);
