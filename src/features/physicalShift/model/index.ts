import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
    ActionDto,
    ActionType,
    getActionsTable,
    mapSearchParamForIndexPosition,
} from 'entities/smartcontract';

export const getShiftActionsForUserEffect = createEffect<
    {
        searchParam: string;
    },
    ActionDto[],
    Error
>(({ searchParam }) =>
    getActionsTable<ActionDto>({
        searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
        searchParam,
    }).then(({ rows }) =>
        rows?.filter(({ type }) => type === ActionType.physical_shift)
    )
);

export const $travelStatus = createStore({
    initialAmountOfSeconds: 0,
    finishAt: 0,
}).on(getShiftActionsForUserEffect.doneData, (state, shiftActionsDto) => {
    const actionDto = shiftActionsDto?.[shiftActionsDto.length - 1];
    const finishAt = (actionDto?.finishes_at || 0) * 1000;
    return {
        initialAmountOfSeconds: finishAt ? finishAt - Date.now() : 0,
        finishAt,
    };
});

export const ShiftGate = createGate<{ searchParam: string }>('ShiftGate');

forward({
    from: ShiftGate.open,
    to: getShiftActionsForUserEffect,
});
