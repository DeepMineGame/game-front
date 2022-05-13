import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStore } from 'effector-react';

import { userStore } from 'entities/user';
import { routes } from './routes';

const renderRoutes = (routeList: { path: string; Component: React.FC }[]) =>
    routeList.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
    ));

export const Router = () => {
    const user = useStore(userStore);

    return (
        <Routes>
            {user?.is_admin && renderRoutes(routes.admin)}
            {renderRoutes(routes.public)}
            {renderRoutes(routes.default)}
        </Routes>
    );
};
