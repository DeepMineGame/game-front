import { InventoryTab } from 'entities/smartcontract';

export const sortConfig = [
    {
        label: 'Rarity',
        key: 0,
    },
    {
        label: 'Level',
        key: 1,
    },
    {
        label: 'Deprecation',
        key: 2,
    },
    {
        label: 'DME Claimed',
        key: 3,
    },
    {
        label: 'Repairs',
        key: 4,
    },
];

export const tabList: InventoryTab[] = [
    InventoryTab.areas,
    InventoryTab.structures,
    InventoryTab.equipment,
    InventoryTab.petobots,
    InventoryTab.consumables,
    InventoryTab.modules,
    InventoryTab.bages,
    InventoryTab.mines,
];

export const tabsNameMap: Record<InventoryTab, string> = {
    [InventoryTab.areas]: 'Areas',
    [InventoryTab.structures]: 'Structures',
    [InventoryTab.equipment]: 'Equipment',
    [InventoryTab.petobots]: 'Petobots',
    [InventoryTab.consumables]: 'Consumables',
    [InventoryTab.modules]: 'Modules',
    [InventoryTab.bages]: 'Bages',
    [InventoryTab.mines]: 'Mines',
};
