import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import { AreasDto, getAreaConfig, searchBy } from 'entities/smartcontract';

export const LandlordAreasGate = createGate<{
    searchParam: string;
}>('AreasGate');

export const getAreasEffect = createEffect<
    { searchParam: string },
    { rows: AreasDto[] } | undefined
>(({ searchParam }) =>
    getTableData(getAreaConfig(searchParam, searchBy.owner))
);

export const landlordAreasStore = createStore<AreasDto[] | null>(null).on(
    getAreasEffect.doneData,
    (_, data) => data?.rows
);

forward({
    from: LandlordAreasGate.open,
    to: getAreasEffect,
});
