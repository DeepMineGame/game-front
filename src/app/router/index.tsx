import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEvent, useStore } from 'effector-react';

import { useChainAuthContext, LoadingSection } from 'shared';
import { authDeepMineUserEffect } from 'features';
import { userStore, userStoreError } from 'entities/user';
import { routes, fallbackRoute, AppRoute } from './routes';
import { intro } from './paths';
import { DocumentTitle } from './components/DocumentTitle';

const LogInWrapper: React.FC<{
    children: any;
    forAdmin?: boolean;
}> = ({ children, forAdmin }) => {
    const { activeUser, notLoggedIn, loading } = useChainAuthContext();
    const user = useStore(userStore);
    const hasUserError = !!useStore(userStoreError);
    const isUserLoading = useStore(authDeepMineUserEffect.pending);

    const renderLoadingSection = () => (
        <LoadingSection key="loading" size="large" />
    );

    const renderRedirect = () => <Navigate to={intro} replace />;

    if (notLoggedIn) return renderRedirect();
    if (loading && !activeUser) return renderLoadingSection();

    if (forAdmin) {
        if (isUserLoading || (!user && !hasUserError))
            return renderLoadingSection();
        if (!user?.is_admin) return renderRedirect();
    }

    return children;
};

const renderRoutes = (routeList: AppRoute[]) =>
    routeList.map(({ path, Component, forLoggedIn, forAdmin, titleTag }) => (
        <Route
            key={path}
            path={path}
            element={
                forLoggedIn ? (
                    <LogInWrapper forAdmin={forAdmin}>
                        <DocumentTitle title={titleTag} />
                        <Component />
                    </LogInWrapper>
                ) : (
                    <>
                        <DocumentTitle title={titleTag} />
                        <Component />
                    </>
                )
            }
        />
    ));

export const Router = () => {
    const { activeUser } = useChainAuthContext();
    const authUser = useEvent(authDeepMineUserEffect);

    useEffect(() => {
        if (activeUser) authUser(activeUser.accountName);
    }, [activeUser, authUser]);

    return (
        <Routes>
            {renderRoutes(routes)}
            <Route
                path="*"
                element={
                    <>
                        <DocumentTitle title={fallbackRoute.titleTag} />
                        <fallbackRoute.Component />
                    </>
                }
            />
        </Routes>
    );
};
