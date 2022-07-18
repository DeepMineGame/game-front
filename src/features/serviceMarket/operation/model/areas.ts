import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import { AreasDto, getAreaConfig, searchBy } from 'entities/smartcontract';

export const AreasGate = createGate<{
    searchParam: string;
    searchIdentificationType?: searchBy.owner;
}>('AreasGate');

export const getAreasEffect = createEffect(
    async ({
        searchParam,
        searchIdentificationType,
    }: {
        searchParam: string;
        searchIdentificationType?: searchBy.owner;
    }) => {
        return getTableData(
            getAreaConfig(searchParam, searchIdentificationType)
        );
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
