import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getMinesTableData, MineDto, searchBy } from 'entities/smartcontract';

export const UserMineGate = createGate<{ searchParam: string }>('UserMineGate');

export const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesTableData({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);
export const userMineStore = createStore<MineDto[]>([]).on(
    getMinesByOwnerEffect.doneData,
    (_, { rows }) => rows
);

forward({
    from: UserMineGate.open,
    to: getMinesByOwnerEffect,
});
