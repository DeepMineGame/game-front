import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminegame } from '../../constants';
import { UserDto } from './types';

export const getSmartContractUserEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'users',
            index_position: 1,
            key_type: '',
            lower_bound: searchParam,
            upper_bound: searchParam,
            limit: 1,
        });
    }
);

export const smartContractUserStore = createStore<UserDto[] | null>(null).on(
    getSmartContractUserEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';
