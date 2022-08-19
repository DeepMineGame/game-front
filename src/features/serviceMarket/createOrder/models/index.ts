import { createGate } from 'effector-react';
import { forward } from 'effector';
import {
    getAreaByOwnerEffect,
    getContractByUserEffect,
    getMinesByOwnerEffect,
} from './effects';

export * from './hasAreaOrMineStore';
export * from './hasEngagedArea';
export * from './hasAreaOrMineStore';
export * from './inventoryModel';
export * from './hasAreaEmptySlots';
export * from './hasActiveLandLordMineOwnerContractAsExecutor';

export const CreateOrderGate = createGate<{ searchParam: string }>(
    'CreateOrderGate'
);

forward({
    from: CreateOrderGate.open,
    to: [getMinesByOwnerEffect, getAreaByOwnerEffect, getContractByUserEffect],
});
