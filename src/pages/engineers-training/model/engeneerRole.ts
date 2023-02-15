import { createEffect, createStore } from 'effector';
import { getRolesTableData, RoleDto, UserRoles } from 'entities/smartcontract';

export const getRolesEffect = createEffect<
    { searchParam: string },
    { rows: RoleDto[] } | undefined
>(getRolesTableData);

export const $engineerRole = createStore<RoleDto | null>(null).on(
    getRolesEffect.doneData,
    (_, data) => data?.rows?.find(({ role }) => role === UserRoles.engineer)
);
