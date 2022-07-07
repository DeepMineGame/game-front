import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import { AreasDto, getAreaConfig } from 'entities/smartcontract';

export const AreasGate = createGate<{ areaId: string }>('AreasGate');

export const getAreasEffect = createEffect(
    async ({ areaId }: { areaId: string }) => {
        return getTableData(getAreaConfig(areaId));
    }
);

export const areasStore = createStore<AreasDto[] | null>(null).on(
    getAreasEffect.doneData,
    (_, { rows }) => rows
);

forward({
    from: AreasGate.open,
    to: getAreasEffect,
});
