import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
    ActionDto,
    ActionState,
    ActionType,
    getActionsTable,
    mapSearchParamForIndexPosition,
} from 'entities/smartcontract';

export const getActionForIndicate = createEffect(
    ({
        searchParam,
    }: {
        searchParam: string;
    }): Promise<ActionDto | undefined> =>
        getActionsTable({
            searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
            searchParam,
        }).then(({ rows }) =>
            rows
                ?.reverse()
                .find(
                    ({ state, type }: ActionDto) =>
                        state === ActionState.active ||
                        type === ActionType.physical_shift
                )
        )
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
