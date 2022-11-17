import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getMinesEffect, MineDto, searchBy } from 'entities/smartcontract';

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
    (_, data) => data?.rows
);

forward({
    from: MinesGate.open,
    to: getMinesByOwnerEffect,
});
