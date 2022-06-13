import { createGate } from 'effector-react';
import { forward } from 'effector';
import { getActionByUserEffect } from 'entities/smartcontract';

export const UserActionGate = createGate<{ searchParam: string }>(
    'UserActionGate'
);

forward({
    from: UserActionGate.open,
    to: getActionByUserEffect,
});
