import React from 'react';

import { ContractorCabin, EquipmentSetPage, MiningPage } from 'pages';
import { contractorCabin, equipmentSet, intro, mining } from './paths';

const IntroPage = React.lazy(async () => ({
    default: (await import('pages')).IntroPage,
}));

export const routes = {
    public: [
        {
            path: intro,
            Component: IntroPage,
        },
    ],
    admin: [
        {
            path: contractorCabin,
            Component: ContractorCabin,
        },
        {
            path: equipmentSet,
            Component: EquipmentSetPage,
        },
        {
            path: mining,
            Component: MiningPage,
        },
    ],
    default: [
        {
            path: '*',
            Component: IntroPage,
        },
    ],
};
