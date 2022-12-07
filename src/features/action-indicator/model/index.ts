import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
    ActionDto,
    ActionState,
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
        const lastNoTravelAction = data?.rows?.find(
            ({ state }) => state === ActionState.active
        );
        const lastTravelAction = data?.rows?.find(
            ({ type }) => type === ActionType.physical_shift
        );

        const isLastNoTravelActionExpired =
            Date.now() >= (lastNoTravelAction?.finishes_at || 0) * 1000;

        if (isLastNoTravelActionExpired) {
            return lastTravelAction;
        }

        return lastNoTravelAction || lastTravelAction;
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
