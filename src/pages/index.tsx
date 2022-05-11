import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useStore } from 'effector-react';
import { userStore } from 'entities/user';
import { ContractorCabin } from './contractorCabin';
import { EquipmentSetPage } from './equipmentSet';
import { contractorCabin, equipmentSet, mining } from './constants';
import { MiningPage } from './mining';

const IntroPage = lazy(() => import('./introPage'));

export const Routing = () => {
    const user = useStore(userStore);
    return (
        <Routes>
            {user?.is_admin && (
                <>
                    <Route
                        path={contractorCabin}
                        element={<ContractorCabin />}
                    />
                    <Route path={equipmentSet} element={<EquipmentSetPage />} />
                    <Route path={mining} element={<MiningPage />} />
                </>
            )}
            <Route path="/intro" element={<IntroPage />} />
            <Route path="*" element={<IntroPage />} />
        </Routes>
    );
};
