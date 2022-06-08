import { forward } from 'effector';
import { createGate } from 'effector-react';
import { getMinesByOwnerEffect } from 'entities/smartcontract';

export const MineConsumerGate = createGate<{ searchParam: string }>(
    'MineConsumerGate'
);
forward({
    from: MineConsumerGate.open,
    to: getMinesByOwnerEffect,
});
