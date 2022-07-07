import { createEffect, createStore } from 'effector';
import { WaxUser } from '@eosdacio/ual-wax';
import { getTableData } from 'shared';
import { createSignTransactionData } from '../../helpers';
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

export const authorizeUser = async (
    chain: WaxUser,
    waxAddress: string,
    userId: string
) => {
    await chain.signTransaction(
        createSignTransactionData({
            contractName: deepminegame,
            contractAction: 'authorize',
            accountName: waxAddress,
            data: {
                wax_user: waxAddress,
                key: userId,
            },
        }),
        { expireSeconds: 300 }
    );
};

export * from './types';
export * from './constants';
