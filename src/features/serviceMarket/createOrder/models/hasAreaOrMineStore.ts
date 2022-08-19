import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import { getTableData } from 'shared';
import {
    getAreaConfig,
    getMinesEffect,
    searchBy,
} from 'entities/smartcontract';

export const HasAreaOrMineGate = createGate<{ searchParam: string }>(
    'HasAreaOrMineGate'
);

export const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesEffect({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);

export const getAreasByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getTableData(getAreaConfig(searchParam, searchBy.owner));
    }
);

export const hasAreaOrMineStore = createStore<boolean>(false)
    .on(getMinesByOwnerEffect.doneData, (_, { rows }) => rows?.length)
    .on(getAreasByOwnerEffect.doneData, (_, { rows }) => rows?.length);

forward({
    from: HasAreaOrMineGate.open,
    to: [getMinesByOwnerEffect, getAreasByOwnerEffect],
});
