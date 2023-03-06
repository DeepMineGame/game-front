import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEvent, useStore } from 'effector-react';

import { useChainAuthContext, LoadingScreen, LogAs } from 'shared';
import { useLogout, LastActionInProgressChecker } from 'features';
import { userStore, getUserFromSessionEffect } from 'entities/user';
import { routes, fallbackRoute, AppRoute } from './routes';
import { DocumentTitle } from './components/DocumentTitle';
import { unidentifiedActivity } from './paths';

const LogInWrapper: React.FC<{
    children: any;
    forAdmin?: boolean;
    forBetaUser?: boolean;
}> = ({ children, forAdmin, forBetaUser }) => {
    const navigate = useNavigate();
    const { activeUser: chainUser, notLoggedIn } = useChainAuthContext();
    const user = useStore(userStore);
    const getUserFromSession = useEvent(getUserFromSessionEffect);
    const logout = useLogout();

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!user) {
            setIsFetching(true);
            getUserFromSession()
                .catch(() => navigate('/', { replace: true }))
                .finally(() => setIsFetching(false));
        }
    }, [user, navigate, getUserFromSession]);

    useEffect(() => {
        const adminAccessDenied = forAdmin && user?.is_admin === false;
        const betaAccessDenied = forBetaUser && user?.is_beta === false;

        if (notLoggedIn || (adminAccessDenied && betaAccessDenied)) {
            navigate('/', { replace: true });
        }
    }, [notLoggedIn, forAdmin, forBetaUser, user, navigate]);

    useEffect(() => {
        if (user?.wax_address && chainUser?.accountName) {
            if (user.wax_address !== chainUser.accountName) logout();
        }
    }, [user?.wax_address, chainUser?.accountName]);

    if (isFetching || (!chainUser && !notLoggedIn))
        return <LoadingScreen key="loading" size="large" />;

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
                        <LastActionInProgressChecker />
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
    const user = useStore(userStore);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.ENDPOINTS?.maintenance.server && !process.env.BETA)
            navigate(unidentifiedActivity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.ENDPOINTS?.maintenance.server]);
    console.log(process.env);
    return (
        <>
            {user?.is_log_as && <LogAs />}
            <Routes>
                {renderRoutes(routes)}
                <Route
                    key="*"
                    path="*"
                    element={
                        <>
                            <DocumentTitle title={fallbackRoute.titleTag} />
                            <fallbackRoute.Component />
                        </>
                    }
                />
            </Routes>
        </>
    );
};
