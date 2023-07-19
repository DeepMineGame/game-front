import { createGate } from 'effector-react';
import { forward } from 'effector';
import {
    getRolesEffect,
    getSmartContractUserEffect,
} from 'entities/smartcontract';
import { getMinesByOwnerEffect } from './currentMine';

export const MineManagementGate = createGate<{ searchParam: string }>(
    'MineManagementGate'
);

forward({
    from: MineManagementGate.open,
    to: [getMinesByOwnerEffect, getRolesEffect, getSmartContractUserEffect],
});
