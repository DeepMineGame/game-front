import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminegame } from '../../constants';
import { ContractorDto } from './types';

export const getContractorsEffect = createEffect(
    async ({ nickname }: { nickname: string }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'contractors',
            index_position: 1,
            key_type: 'name',
            lower_bound: nickname,
            limit: 1,
        });
    }
);

export const contractorsStore = createStore<ContractorDto[] | null>(null).on(
    getContractorsEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';
