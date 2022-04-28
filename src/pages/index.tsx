import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStore } from 'effector-react';
import { userStore } from 'entities/user';
import { ContractorCabin } from './contractorCabin';

const IntroPage = lazy(() => import('./introPage'));

export const Routing = () => {
    const user = useStore(userStore);
    return (
        <Routes>
            {user?.is_admin && (
                <Route path="/contractor-cabin" element={<ContractorCabin />} />
            )}
            <Route path="/intro" element={<IntroPage />} />
            <Route path="*" element={<IntroPage />} />
        </Routes>
    );
};
