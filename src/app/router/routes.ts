import React from 'react';

import { ContractorCabin, EquipmentSetPage, HomePage, MiningPage } from 'pages';
import { MineOwnerPage } from 'pages/mineOwner';
import {
    contractorCabin,
    equipmentSet,
    home,
    intro,
    mineOwner,
    mining,
} from './paths';

const IntroPage = React.lazy(async () => ({
    default: (await import('pages')).IntroPage,
}));

export type AppRoute = {
    titleTag: string;
    path: string;
    Component: React.FC;
    forLoggedIn?: boolean;
    forAdmin?: boolean;
};

export const routes: AppRoute[] = [
    {
        path: intro,
        Component: IntroPage,
        titleTag: 'Intro - Deepmine',
    },
    {
        path: contractorCabin,
        Component: ContractorCabin,
        forLoggedIn: true,
        titleTag: 'Contractor — DeepMine',
    },
    {
        path: equipmentSet,
        Component: EquipmentSetPage,
        forLoggedIn: true,
        forAdmin: true,
        titleTag: 'Equipment set — DeepMine',
    },
    {
        path: home,
        Component: HomePage,
        forLoggedIn: true,
        titleTag: 'Hometown — DeepMine',
    },
    {
        path: mining,
        Component: MiningPage,
        forLoggedIn: true,
        forAdmin: true,
        titleTag: 'Mining — DeepMine',
    },
    {
        path: mineOwner,
        Component: MineOwnerPage,
        forLoggedIn: true,
        forAdmin: true,
        titleTag: 'Mine owner cabin — DeepMine',
    },
];

export const fallbackRoute: AppRoute = {
    path: '*',
    Component: IntroPage,
    titleTag: 'Intro - Deepmine',
};
