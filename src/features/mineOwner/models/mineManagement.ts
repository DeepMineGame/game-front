import { createGate } from 'effector-react';
import { forward } from 'effector';
import { getMinesByOwnerEffect, getRolesEffect } from 'entities/smartcontract';

export const MineManagementGate = createGate<{ searchParam: string }>(
    'MineManagementGate'
);

forward({
    from: MineManagementGate.open,
    to: [getMinesByOwnerEffect, getRolesEffect],
});
