import { FC } from 'react';

import {
    ContractorCabin,
    EquipmentSetPage,
    CityPage,
    MiningPage,
    ContractorStatsAndInfoPage,
    MineOwnerStatAndInfoPage,
    LandLordPage,
    HivePage,
    PageNotFound,
    MineManagementPage,
    MineOwnerPage,
    MineOwnerMiningCrewPage,
    InfoPage,
    Warehouse,
    ServiceMarketPage,
    AreaManagementPage,
    CreateOrderPage,
    LandlordStatsAndInfoPage,
    OperationPage,
    NftPreviewPage,
    AuthPage,
    FaqPage,
    Wasteland,
    EngineerPage,
    EquipmentHallPage,
    EngineersTraining,
} from 'pages';

import * as paths from './paths';

export type AppRoute = {
    titleTag: string;
    path: string;
    Component: FC;
    forLoggedIn?: boolean;
    forAdmin?: boolean;
    forBetaUser?: boolean;
};

export const routes: AppRoute[] = [
    {
        path: paths.root,
        Component: AuthPage,
        titleTag: 'Intro - Deepmine',
    },
    {
        path: paths.intro,
        Component: AuthPage,
        titleTag: 'Intro - Deepmine',
    },
    {
        path: paths.contractorCabin,
        Component: ContractorCabin,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Contractor — DeepMine',
    },
    {
        path: paths.equipmentSet,
        Component: EquipmentSetPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Equipment set — DeepMine',
    },
    {
        path: paths.city,
        Component: CityPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'City — DeepMine',
    },
    {
        path: paths.wasteland,
        Component: Wasteland,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Wasteland — DeepMine',
    },
    {
        path: paths.mining,
        Component: MiningPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Mining — DeepMine',
    },
    {
        path: paths.mineOwner,
        Component: MineOwnerPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Mine owner cabin — DeepMine',
    },
    {
        path: paths.mineManagement,
        Component: MineManagementPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Mine management — DeepMine',
    },
    {
        path: paths.contractorStatsAndInfo,
        Component: ContractorStatsAndInfoPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Contractor / Stats and Info',
    },
    {
        path: paths.mineOwnerStatsAndInfo,
        Component: MineOwnerStatAndInfoPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Mine owner / Stats and Info',
    },
    {
        path: paths.mineOwnerMineCrew,
        Component: MineOwnerMiningCrewPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Mine owner / Mine crew',
    },
    {
        path: paths.pageNotFound,
        Component: PageNotFound,
        forLoggedIn: false,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Badlands — DeepMine',
    },
    {
        path: paths.wipPage,
        Component: () => <PageNotFound type="wip" />,
        forLoggedIn: false,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Badlands — DeepMine',
    },
    {
        path: paths.serviceMarket,
        Component: ServiceMarketPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Service-market — DeepMine',
    },
    {
        path: paths.serviceMarketOrder,
        Component: OperationPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Service-market — DeepMine',
    },
    {
        path: paths.landLord,
        Component: LandLordPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Landlord — DeepMine',
    },
    {
        path: paths.landLordStats,
        Component: LandlordStatsAndInfoPage,
        forLoggedIn: false,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Landlord — DeepMine',
    },
    {
        path: paths.areaManagement,
        Component: AreaManagementPage,
        forLoggedIn: false,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Landlord — Area management',
    },
    {
        path: paths.hive,
        Component: HivePage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Hive — DeepMine',
    },
    {
        path: paths.user,
        Component: InfoPage,
        forLoggedIn: false,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Hive — DeepMine',
    },
    {
        path: paths.warehouse,
        Component: Warehouse,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Warehouse — DeepMine',
    },
    {
        path: paths.createOrder,
        Component: CreateOrderPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Create order — DeepMine',
    },
    {
        path: paths.inventoryItemPreview,
        Component: NftPreviewPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Card preview — DeepMine',
    },
    {
        path: paths.faq,
        titleTag: 'FAQ — DeepMine',
        Component: FaqPage,
        forLoggedIn: false,
        forAdmin: true,
        forBetaUser: true,
    },
    {
        path: paths.engineer,
        Component: EngineerPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Engineer Workshop — DeepMine',
    },
    {
        path: paths.engineerEquipmentHall,
        Component: EquipmentHallPage,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Engineer Equipment Hall — DeepMine',
    },
    {
        path: paths.engineerTraining,
        Component: EngineersTraining,
        forLoggedIn: true,
        forAdmin: true,
        forBetaUser: true,
        titleTag: 'Engineers Training — DeepMine',
    },
];

export const fallbackRoute: AppRoute = {
    path: '*',
    Component: PageNotFound,
    titleTag: 'Intro - Deepmine',
};
