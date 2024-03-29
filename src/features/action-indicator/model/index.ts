import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
    ActionDto,
    ActionType,
    getActionsTable,
    mapSearchParamForIndexPosition,
} from 'entities/smartcontract';

export const getActionForIndicate = createEffect<
    { searchParam: string },
    ActionDto | undefined
>(({ searchParam }) =>
    getActionsTable<ActionDto>({
        searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
        searchParam,
    }).then((data) => {
        return data?.rows?.find(
            ({ finishes_at }) => finishes_at * 1000 >= Date.now()
        );
    })
);

export const $indicateActionDetails = createStore({
    initialAmountOfSeconds: 0,
    finishAt: 0,
    actionType: ActionType.undefined,
}).on(getActionForIndicate.doneData, (state, lastAction) => {
    const finishAt = (lastAction?.finishes_at || 0) * 1000;
    return {
        initialAmountOfSeconds: finishAt ? finishAt - Date.now() : 0,
        finishAt,
        actionType: lastAction?.type || ActionType.undefined,
    };
});

export const LastActionGate = createGate<{ searchParam: string }>(
    'LastActionGate'
);

forward({
    from: LastActionGate.open,
    to: getActionForIndicate,
});
