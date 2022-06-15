import React from 'react';

import {
    ContractorCabin,
    EquipmentSetPage,
    HomePage,
    MiningPage,
    ContractorStatsAndInfoPage,
    MineOwnerStatAndInfoPage,
    LandLordPage,
    HivePage,
    PageNotFound,
    MineManagementPage,
    MineOwnerPage,
    MineOwnerMiningCrewPage,
} from 'pages';

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
    contractorStatsAndInfo,
    mineOwnerStatsAndInfo,
    mineOwnerMineCrew,
    landLord,
    serviceMarket,
    inventory,
    hive,
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
        path: contractorStatsAndInfo,
        Component: ContractorStatsAndInfoPage,
        forLoggedIn: true,
        forAdmin: false,
        titleTag: 'Contractor / Stats and Info',
    },
    {
        path: mineOwnerStatsAndInfo,
        Component: MineOwnerStatAndInfoPage,
        forLoggedIn: true,
        forAdmin: false,
        titleTag: 'Mine owner / Stats and Info',
    },

    {
        path: mineOwnerMineCrew,
        Component: MineOwnerMiningCrewPage,
        forLoggedIn: true,
        forAdmin: false,
        titleTag: 'Mine owner / Mine crew',
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
    {
        path: serviceMarket,
        Component: () => <PageNotFound type="wip" title="Service market" />,
        forLoggedIn: false,
        forAdmin: false,
        titleTag: 'Service — DeepMine',
    },
    {
        path: landLord,
        Component: LandLordPage,
        forLoggedIn: false,
        forAdmin: false,
        titleTag: 'Landlord — DeepMine',
    },
    {
        path: inventory,
        Component: () => <PageNotFound type="wip" title="Inventory" />,
        forLoggedIn: false,
        forAdmin: false,
        titleTag: 'Inventory — DeepMine',
    },
    {
        path: hive,
        Component: HivePage,
        forLoggedIn: true,
        forAdmin: false,
        titleTag: 'Hive — DeepMine',
    },
];

export const fallbackRoute: AppRoute = {
    path: '*',
    Component: PageNotFound,
    titleTag: 'Intro - Deepmine',
};
