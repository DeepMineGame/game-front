import {
    ID_TO_INVENTORY,
    InventoryNameType,
    UserInventoryType,
} from 'entities/smartcontract';

export const getEquipmentName = (equipment: UserInventoryType) =>
    ID_TO_INVENTORY[equipment.template_id];

export const findEquipmentByName = (
    inventory: UserInventoryType[],
    name: InventoryNameType
) => inventory.find((v) => getEquipmentName(v) === name);

export const filterEquipmentByName = (
    inventory: UserInventoryType[],
    name: InventoryNameType
) => inventory.filter((v) => getEquipmentName(v) === name);
