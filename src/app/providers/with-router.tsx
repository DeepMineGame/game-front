import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingScreen } from 'shared';

export const withRouter = (Component: React.FC) => () =>
    (
        <BrowserRouter>
            <Suspense fallback={<LoadingScreen key="loading" size="large" />}>
                <Component />
            </Suspense>
        </BrowserRouter>
    );
