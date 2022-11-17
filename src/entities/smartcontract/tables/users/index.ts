import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame } from '../../constants';
import { UserDto } from './types';

export const getSmartContractUserEffect = createEffect<
    { searchParam: string },
    { rows: UserDto[] } | undefined
>(({ searchParam }) =>
    getTableData({
        code: deepminegame,
        scope: deepminegame,
        table: 'users',
        index_position: 1,
        key_type: '',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit: 1,
    })
);

export const smartContractUserStore = createStore<UserDto[] | null>(null).on(
    getSmartContractUserEffect.doneData,
    (_, data) => data?.rows
);

export * from './types';
export * from './constants';
