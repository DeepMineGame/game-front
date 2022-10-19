import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import {
    ContractorDto,
    ID_TO_INVENTORY,
    InventoryNameType,
    miningEquipmentNames,
} from 'entities/smartcontract';

export const getEquipmentName = (
    equipment: MergedInventoryWithAtomicAssets[number]
) => ID_TO_INVENTORY[equipment.template_id];

export const findEquipmentByName = (
    inventory: MergedInventoryWithAtomicAssets,
    name: InventoryNameType
) => inventory.find((v) => getEquipmentName(v) === name);

export const filterEquipmentByName = (
    inventory: MergedInventoryWithAtomicAssets,
    name: InventoryNameType
) => inventory.filter((v) => getEquipmentName(v) === name);

/**
 * Return specified equipment object
 * @param equipmentSlots
 * @param userInventory
 * @example result:
 * @return {
 *             Cutter: {
 *                 asset_id: '1099523428345',
 *                 template_id: 177445,
 *                 owner: 'vladislavkhv',
 *                 rarity: 2,
 *                 level: 0,
 *                 inv_type: 2,
 *                 struct_type: 0,
 *                 equip_type: 1,
 *                 in_use: 1,
 *             },
 * ....
 *             'Wandering Reactor': {
 *                 asset_id: '1099531372366',
 *                 template_id: 176873,
 *                 owner: 'vladislavkhv',
 *                 rarity: 3,
 *                 level: 0,
 *                 inv_type: 2,
 *                 struct_type: 0,
 *                 equip_type: 2,
 *                 in_use: 1,
 *             },
 *         }
 */
export const getSelectedEquipmentBySlots = (
    equipmentSlots: ContractorDto['equip_slots'],
    userInventory: MergedInventoryWithAtomicAssets
) => {
    const equipment = equipmentSlots
        .map(({ asset_id }) =>
            userInventory.find((v) => v.asset_id === asset_id)
        )
        .filter((v) => v) as MergedInventoryWithAtomicAssets;

    return Object.fromEntries(
        miningEquipmentNames.map((name) => [
            name,
            findEquipmentByName(equipment, name),
        ])
    );
};
