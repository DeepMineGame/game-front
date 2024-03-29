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

export const $userMine = createStore<MineDto | null>(null).on(
    getMinesByOwnerEffect.doneData,
    (_, data) => data?.rows?.[0]
);

forward({
    from: MineConsumerGate.open,
    to: getMinesByOwnerEffect,
});
