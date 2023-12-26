import { FC } from 'react';

import {
    AreaManagementPage,
    AuthPage,
    CityPage,
    ContractorCabin,
    ContractorStatsAndInfoPage,
    CreateOrderPage,
    CreateRentOrderPage,
    EngineerPage,
    EngineersTraining,
    EquipmentHallPage,
    EquipmentSetPage,
    FaqPage,
    HivePage,
    InfoPage,
    InterfaceStubPage,
    LandLordPage,
    LandlordStatsAndInfoPage,
    MineOwnerManagementPage,
    MineOwnerMiningCrewPage,
    MineOwnerPage,
    MineOwnerStatAndInfoPage,
    MiningPage,
    NftPreviewPage,
    NotFoundPage,
    OperationPage,
    ServiceMarketPage,
    ServiceMarketPageType,
    Warehouse,
    Wasteland,
} from 'pages';

import { OperationPageType } from 'entities/contract';
import * as paths from './paths';
import { EngineerStatPage } from '../../pages/engineer/stat';

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
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Contractor — DeepMine',
    },
    {
        path: paths.equipmentSet,
        Component: EquipmentSetPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Equipment set — DeepMine',
    },
    {
        path: paths.city,
        Component: CityPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'City — DeepMine',
    },
    {
        path: paths.wasteland,
        Component: Wasteland,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Wasteland — DeepMine',
    },
    {
        path: paths.mining,
        Component: MiningPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Mining — DeepMine',
    },
    {
        path: paths.mineOwner,
        Component: MineOwnerPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Mine Deck — DeepMine',
    },
    {
        path: paths.mineManagement,
        Component: MineOwnerManagementPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Mine management — DeepMine',
    },
    {
        path: paths.contractorStatsAndInfo,
        Component: ContractorStatsAndInfoPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Contractor / Stats and Info',
    },
    {
        path: paths.mineOwnerStatsAndInfo,
        Component: MineOwnerStatAndInfoPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Mine owner / Stats and Info',
    },
    {
        path: paths.mineOwnerMineCrew,
        Component: MineOwnerMiningCrewPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Mine owner / Mine crew',
    },
    {
        path: paths.serviceMarket,
        Component: () => (
            <ServiceMarketPage type={ServiceMarketPageType.serviceMarket} />
        ),
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Service-market — DeepMine',
    },
    {
        path: paths.rentalHub,
        Component: () => (
            <ServiceMarketPage type={ServiceMarketPageType.rentalHub} />
        ),
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Rental hub — DeepMine',
    },
    {
        path: paths.createRentOrder,
        Component: CreateRentOrderPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Rent hub — DeepMine',
    },
    {
        path: paths.serviceMarketOrder,
        Component: () => (
            <OperationPage type={OperationPageType.serviceMarket} />
        ),
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Service-market — DeepMine',
    },
    {
        path: paths.rentalHubOrder,
        Component: () => <OperationPage type={OperationPageType.rentalHub} />,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Service-market — DeepMine',
    },
    {
        path: paths.landLord,
        Component: LandLordPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Landlord — DeepMine',
    },
    {
        path: paths.landLordStats,
        Component: LandlordStatsAndInfoPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Landlord — DeepMine',
    },
    {
        path: paths.areaManagement,
        Component: AreaManagementPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Landlord — Area management',
    },
    {
        path: paths.hive,
        Component: HivePage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Hive — DeepMine',
    },
    {
        path: paths.user,
        Component: InfoPage,
        forLoggedIn: false,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Hive — DeepMine',
    },
    {
        path: paths.warehouse,
        Component: Warehouse,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Warehouse — DeepMine',
    },
    {
        path: paths.createOrder,
        Component: CreateOrderPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Create order — DeepMine',
    },
    {
        path: paths.inventoryItemPreview,
        Component: NftPreviewPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Card preview — DeepMine',
    },
    {
        path: paths.faq,
        titleTag: 'FAQ — DeepMine',
        Component: FaqPage,
        forLoggedIn: false,
        forAdmin: false,
        forBetaUser: false,
    },
    {
        path: paths.engineer,
        Component: EngineerPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Engineer Workshop — DeepMine',
    },
    {
        path: paths.engineerEquipmentHall,
        Component: EquipmentHallPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Engineer Equipment Hall — DeepMine',
    },
    {
        path: paths.unidentifiedActivity,
        Component: InterfaceStubPage,
        forLoggedIn: false,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Unidentified seismic activity — DeepMine',
    },
    {
        path: paths.engineerTraining,
        Component: EngineersTraining,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Engineers Training — DeepMine',
    },
    {
        path: paths.engineerStatAndInfo,
        Component: EngineerStatPage,
        forLoggedIn: true,
        forAdmin: false,
        forBetaUser: false,
        titleTag: 'Engineers Stat — DeepMine',
    },
];

export const fallbackRoute: AppRoute = {
    path: '*',
    Component: NotFoundPage,
    titleTag: 'Intro - Deepmine',
};
