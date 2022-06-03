import React from 'react';

import { ContractorCabin, EquipmentSetPage, HomePage, MiningPage } from 'pages';
import { MineManagementPage, MineOwnerPage } from 'pages/mineOwner';
import { PageNotFound } from 'pages/pageNotFound';
import {
    contractorCabin,
    equipmentSet,
    home,
    intro,
    mineManagement,
    mineOwner,
    mining,
    pageNotFound,
    root,
    wipPage,
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
        path: root,
        Component: IntroPage,
        titleTag: 'Intro - Deepmine',
    },
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
        forAdmin: false,
        titleTag: 'Mining — DeepMine',
    },
    {
        path: mineOwner,
        Component: MineOwnerPage,
        forLoggedIn: true,
        forAdmin: false,
        titleTag: 'Mine owner cabin — DeepMine',
    },
    {
        path: mineManagement,
        Component: MineManagementPage,
        forLoggedIn: true,
        forAdmin: false,
        titleTag: 'Mine management — DeepMine',
    },
    {
        path: pageNotFound,
        Component: PageNotFound,
        forLoggedIn: false,
        forAdmin: false,
        titleTag: 'Badlands — DeepMine',
    },
    {
        path: wipPage,
        Component: () => <PageNotFound type="wip" />,
        forLoggedIn: false,
        forAdmin: false,
        titleTag: 'Badlands — DeepMine',
    },
];

export const fallbackRoute: AppRoute = {
    path: '*',
    Component: PageNotFound,
    titleTag: 'Intro - Deepmine',
};
