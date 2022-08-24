import { createStore } from 'effector';
import { InUseType, miningEquipmentNames } from 'entities/smartcontract';
import { findEquipmentByName } from '../../../equipmentSet';
import { getInventoryEffect } from './effects';

export const hasInstalledEquipmentStore = createStore<boolean>(false).on(
    getInventoryEffect.doneData,

    (_, { rows: userInventory }) => {
        const installedMiningEquipment = Object.fromEntries(
            miningEquipmentNames.map((name) => [
                name,
                findEquipmentByName(userInventory || [], name),
            ])
        );

        return Object.values(installedMiningEquipment)?.some(
            (item) => item?.in_use === InUseType.inUse
        );
    }
);
