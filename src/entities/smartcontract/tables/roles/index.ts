import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame } from '../../constants';
import { RoleDto } from './types';

export * from './types';

export const extractFeeToClaimAttr = (role: RoleDto): number =>
    Number(
        role?.attrs?.filter(({ key }) => key === 'fee_to_claim')?.[0]?.value
    ) || 0;

export const getRolesTableData = ({ searchParam }: { searchParam: string }) => {
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
};

export const getRolesEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getRolesTableData({ searchParam });
    }
);

export const rolesStore = createStore<RoleDto[] | null>(null).on(
    getRolesEffect.doneData,
    (_, { rows }) => rows
);
