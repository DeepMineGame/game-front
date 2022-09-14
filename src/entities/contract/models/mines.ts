import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getAtomicAssetsByUser } from 'entities/atomicassets';
import {
    getMinesEffect,
    mineAssetTemplateId,
    MineDto,
    searchBy,
    UserInventoryType,
} from 'entities/smartcontract';

const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesEffect({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);

export const MinesGate = createGate<{ searchParam: string }>('MinesGate');

export const minesStore = createStore<MineDto[]>([]).on(
    getMinesByOwnerEffect.doneData,
    (_, { rows }) => rows
);

export const getAtomicAssetsEffect = createEffect(getAtomicAssetsByUser);

export const userAtomicAssetsMinesStore = createStore<UserInventoryType[]>(
    []
).on(getAtomicAssetsEffect.doneData, (_, payload) =>
    payload?.filter(({ template_id }) => template_id === mineAssetTemplateId)
);

forward({
    from: MinesGate.open,
    to: [getMinesByOwnerEffect, getAtomicAssetsEffect],
});
