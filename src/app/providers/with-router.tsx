import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from 'shared';

export const withRouter = (component: () => React.ReactNode) => () =>
    (
        <BrowserRouter>
            <Suspense fallback={<Loader size="default" />}>
                {component()}
            </Suspense>
        </BrowserRouter>
    );
