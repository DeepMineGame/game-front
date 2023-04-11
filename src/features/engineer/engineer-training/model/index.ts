import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getStatRolesTableData, UserRoles } from 'entities/smartcontract';

export const EngineerTrainingRoom = createGate<{ searchParam: string }>(
    'EngineerTrainingRoom'
);
export const getExpEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        const data = await getStatRolesTableData({ searchParam });

        return data?.rows;
    }
);

export const $xp = createStore<number>(0).on(
    getExpEffect.doneData,
    (_, data) =>
        data?.find(({ role }) => role === UserRoles.engineer)?.experience
);

forward({
    from: EngineerTrainingRoom.open,
    to: getExpEffect,
});
