import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { createGate } from 'effector-react';
import { forward } from 'effector/compat';
import { AreasDto, getAreaConfig, searchBy } from 'entities/smartcontract';

const getAreasEffect = createEffect<
    { searchParam: string; searchIdentificationType?: searchBy },
    { rows: AreasDto[] } | undefined
>(({ searchParam, searchIdentificationType = searchBy.owner }) =>
    getTableData(getAreaConfig(searchParam, searchIdentificationType))
);

export const $area = createStore<AreasDto | null>(null).on(
    getAreasEffect.doneData,
    (_, data) => data?.rows?.[0]
);

export const UserAreaGate = createGate<{ searchParam: string }>('AreaGate');

forward({ from: UserAreaGate.open, to: getAreasEffect });
