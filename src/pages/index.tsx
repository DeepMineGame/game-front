import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ContractorMainPage = lazy(() => import('./contractor/main'));

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<ContractorMainPage />} />
            <Route path="*" element={<div>404 not found</div>} />
        </Routes>
    );
};
