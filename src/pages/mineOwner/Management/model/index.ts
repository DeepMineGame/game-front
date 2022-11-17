import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
    ActionDto,
    ActionType,
    getActionsTable,
    mapSearchParamForIndexPosition,
} from 'entities/smartcontract';

export const ChangeDepthGate = createGate<{ searchParam: string }>(
    'ChangeDepthGate'
);
export const getActionsEffect = createEffect<
    { searchParam: string },
    { rows: ActionDto[] }
>(({ searchParam }) =>
    getActionsTable({
        searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
        searchParam,
    })
);
export const $changeDepthAction = createStore<ActionDto | null>(null).on(
    getActionsEffect.doneData,
    (_, { rows }) =>
        rows?.find(
            (action) => action.type === ActionType.mine_change_layer_depth
        )
);

forward({
    from: ChangeDepthGate.open,
    to: getActionsEffect,
});
