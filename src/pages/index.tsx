import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStore } from 'effector-react';
import { useLogout } from 'features';
import { Title } from 'shared';
import { userStore } from 'entities/user';

const IntroPage = lazy(() => import('./introPage'));

export const Routing = () => {
    const user = useStore(userStore);
    const logout = useLogout();
    return (
        <Routes>
            {user?.is_admin && (
                <Route
                    path="/contractor-cabin"
                    element={
                        <div>
                            <Title level={3} italic fontFamily="bai">
                                contractor cabin in progress...🧑🏻‍💻
                            </Title>
                            <div onClick={logout}>logout</div>
                        </div>
                    }
                />
            )}
            <Route path="/intro" element={<IntroPage />} />
            <Route path="*" element={<IntroPage />} />
        </Routes>
    );
};
