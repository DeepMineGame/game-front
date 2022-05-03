import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader, LoaderSize } from 'shared';

export const withRouter = (component: () => React.ReactNode) => () =>
    (
        <BrowserRouter>
            <Suspense fallback={<Loader size={LoaderSize.small} />}>
                {component()}
            </Suspense>
        </BrowserRouter>
    );
