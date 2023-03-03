import { createStore } from 'effector';
import { InUseType, miningEquipmentNames } from 'entities/smartcontract';
import { findEquipmentByName } from '../../../equipment-set';
import { getInventoryEffect } from './effects';

export const hasInstalledEquipmentStore = createStore<boolean>(false).on(
    getInventoryEffect.doneData,

    (_, data) => {
        const installedMiningEquipment = Object.fromEntries(
            miningEquipmentNames.map((name) => [
                name,
                findEquipmentByName(data?.rows || [], name),
            ])
        );

        return Object.values(installedMiningEquipment)?.some(
            (item) => item?.in_use === InUseType.inUse
        );
    }
);
