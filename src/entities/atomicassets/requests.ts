import axios from 'axios';

import { ATOMIC_ASSETS_ENDPOINT, WAX_GET_TABLE_ENDPOINT } from 'app';
import { UserInventoryType } from '../smartcontract';
import { AssetDataType } from './types';

export const getAtomicAssetsDataById = async (id: string | number) => {
    const { data } = await axios.get(
        `${ATOMIC_ASSETS_ENDPOINT}/atomicassets/v1/assets/${id}`
    );

    return data?.data as AssetDataType | undefined;
};

export const getAtomicAssetsByUser = async ({
    accountName,
}: {
    accountName: string;
}) => {
    const { data } = await axios.post(`${WAX_GET_TABLE_ENDPOINT}`, {
        json: true,
        code: 'atomicassets',
        scope: accountName,
        table: 'assets',
        index_position: 1,
        limit: 500,
        reverse: false,
        show_payer: false,
    });

    return data?.rows as UserInventoryType[] | undefined;
};
