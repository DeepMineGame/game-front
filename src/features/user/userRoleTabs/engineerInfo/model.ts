import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getRolesTableData, RoleDto, UserRoles } from 'entities/smartcontract';

export const EngineerInfoGate = createGate<{ searchParam: string }>(
    'EngineerInfoGate'
);
export const getRolesEffect = createEffect<
    { searchParam: string },
    { rows: RoleDto[] } | undefined
>(getRolesTableData);

export const $engineerRole = createStore<RoleDto | null>(null).on(
    getRolesEffect.doneData,
    (_, data) => data?.rows?.find(({ role }) => role === UserRoles.engineer)
);

forward({
    from: EngineerInfoGate.open,
    to: getRolesEffect,
});
