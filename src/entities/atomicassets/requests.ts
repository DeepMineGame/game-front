import axios from 'axios';
import {
    endpoints,
    getNextEndpoint,
    ConnectionCountLimit,
} from 'app/constants';
import { wait } from 'shared';
import { UserInventoryType } from '../smartcontract';
import { AssetDataType } from './types';

let currentAtomicEndpoint = endpoints.atomic[0];

let currentWaxEndpoint = endpoints.wax[0];

export const getAtomicAssetsDataById = async (
    id: string | number,
    connectionCount = 0
): Promise<AssetDataType | undefined> => {
    try {
        connectionCount++;
        const { data } = await axios.get(
            `${currentAtomicEndpoint}/assets/${id}`
        );

        return data?.data;
    } catch (error) {
        if (
            (error as Error).message === 'Network Error' ||
            ((error as any).response &&
                Number((error as any)?.response.status) >= 500)
        ) {
            if (connectionCount >= ConnectionCountLimit.atomic)
                throw new Error('Network Error', error as Error);

            currentAtomicEndpoint = getNextEndpoint({
                endpointsList: endpoints.atomic,
                currentEndpoint: currentAtomicEndpoint,
            });

            await wait(1);
            return await getAtomicAssetsDataById(id, connectionCount);
        }

        throw new Error((error as any).message);
    }
};

export const getAssets = async (
    ids: string[],
    connectionCount = 0
): Promise<AssetDataType[]> => {
    try {
        connectionCount++;

        const { data = [] } = await axios.get(
            `${currentAtomicEndpoint}/assets?ids=${ids
                .filter((i) => i)
                .join(',')}`
        );

        return data?.data as AssetDataType[];
    } catch (error) {
        if (
            (error as Error).message === 'Network Error' ||
            ((error as any).response &&
                Number((error as any)?.response.status) >= 500)
        ) {
            if (connectionCount >= ConnectionCountLimit.atomic)
                throw new Error('Network Error', error as Error);

            currentAtomicEndpoint = getNextEndpoint({
                endpointsList: endpoints.atomic,
                currentEndpoint: currentAtomicEndpoint,
            });

            await wait(1);
            return await getAssets(ids, connectionCount);
        }

        throw new Error((error as any).message);
    }
};

export const getAtomicAssetsByUser = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<UserInventoryType[]> => {
    try {
        connectionCount++;

        const { data } = await axios.post<{ rows: UserInventoryType[] }>(
            `${currentWaxEndpoint}/v1/chain/get_table_rows`,
            {
                json: true,
                code: 'atomicassets',
                scope: searchParam,
                table: 'assets',
                index_position: 1,
                limit: 500,
                reverse: false,
                show_payer: false,
            }
        );

        return data.rows;
    } catch (error) {
        if (
            (error as Error).message === 'Network Error' ||
            ((error as any).response &&
                Number((error as any)?.response.status) >= 500)
        ) {
            if (connectionCount >= ConnectionCountLimit.wax)
                throw new Error('Network Error', error as Error);

            currentWaxEndpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: currentWaxEndpoint,
            });

            await wait(1);
            return await getAtomicAssetsByUser({
                searchParam,
                connectionCount,
            });
        }

        throw new Error((error as Error).message);
    }
};
