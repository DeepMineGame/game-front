import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminegame } from '../../constants';
import { RoleDto } from './types';

export * from './types';

export const extractDmeToClaimAttr = (role: RoleDto) =>
    role?.attrs?.filter(({ key }) => key === 'dme_to_claim')?.[0];

export const getRolesEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'roles',
            index_position: 2,
            key_type: 'name',
            lower_bound: searchParam,
            upper_bound: searchParam,
            limit: 10,
        });
    }
);

export const rolesStore = createStore<RoleDto[] | null>(null).on(
    getRolesEffect.doneData,
    (_, { rows }) => rows
);
