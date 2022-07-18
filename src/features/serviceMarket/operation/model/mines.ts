import { forward } from 'effector';
import { createGate } from 'effector-react';
import { getMinesByOwnerEffect } from 'entities/smartcontract';

export const MinesGate = createGate<{ searchParam: string }>('MinesGate');
forward({
    from: MinesGate.open,
    to: getMinesByOwnerEffect,
});
