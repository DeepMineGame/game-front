import React from 'react';

import { ContractorCabin, EquipmentSetPage, HomePage, MiningPage } from 'pages';
import { contractorCabin, equipmentSet, home, intro, mining } from './paths';

const IntroPage = React.lazy(async () => ({
    default: (await import('pages')).IntroPage,
}));

export const routes = {
    public: [
        {
            path: intro,
            Component: IntroPage,
            titleTag: 'Intro - Deepmine',
        },
        {
            path: contractorCabin,
            Component: ContractorCabin,
            titleTag: 'Contractor — DeepMine',
        },
        {
            path: equipmentSet,
            Component: EquipmentSetPage,
            titleTag: 'Equipment set — DeepMine',
        },
        {
            path: home,
            Component: HomePage,
            titleTag: 'Hometown — DeepMine',
        },
    ],
    admin: [
        {
            path: mining,
            Component: MiningPage,
            titleTag: 'Mining — DeepMine',
        },
    ],
    default: [
        {
            path: '*',
            Component: IntroPage,
            titleTag: 'Intro - Deepmine',
        },
    ],
};
