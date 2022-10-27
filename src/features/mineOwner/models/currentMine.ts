import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getMinesEffect, MineDto, searchBy } from 'entities/smartcontract';

export const MineConsumerGate = createGate<{ searchParam: string }>(
    'MineConsumerGate'
);

export const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesEffect({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);

export const userMineStore = createStore<MineDto[] | null>(null).on(
    getMinesByOwnerEffect.doneData,
    (_, rows) => rows
);

forward({
    from: MineConsumerGate.open,
    to: getMinesByOwnerEffect,
});
