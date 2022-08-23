import { createGate } from 'effector-react';
import { forward } from 'effector';
import {
    getAreaByOwnerEffect,
    getContractByExecutorEffect,
    getInventoryEffect,
    getMinesByOwnerEffect,
} from './effects';

export * from './hasAreaOrMineStore';
export * from './hasEngagedArea';
export * from './hasAreaOrMineStore';
export * from './inventoryModel';
export * from './hasAreaEmptySlots';
export * from './hasMineEmptySlots';
export * from './hasActiveLandLordMineOwnerContractAsExecutor';
export * from './hasInstalledEquipmentStore';
export * from './hasActiveMineOwnerContractorContractAsExecutor';

export const CreateOrderGate = createGate<{ searchParam: string }>(
    'CreateOrderGate'
);

forward({
    from: CreateOrderGate.open,
    to: [
        getMinesByOwnerEffect,
        getAreaByOwnerEffect,
        getContractByExecutorEffect,
        getInventoryEffect,
    ],
});
