import axios, { AxiosError } from 'axios';
import {
    endpoints,
    getNextEndpoint,
    ConnectionCountLimit,
} from 'app/constants';
import { isServerError, wait } from 'shared';
import { UserInventoryType } from '../smartcontract';
import { AssetDataType } from './types';

let [currentAtomicEndpoint] = endpoints.atomic;

let [currentWaxEndpoint] = endpoints.wax;

export const getAssets = async <T>(
    ids: T,
    connectionCount = 0
): Promise<
    T extends string[] ? AssetDataType[] : AssetDataType | undefined
> => {
    const isIdsArray = Array.isArray(ids);

    try {
        connectionCount++;

        const { data } = await axios.get(
            `${currentAtomicEndpoint}/assets${
                isIdsArray
                    ? `?ids=${ids.filter((i) => i).join(',')}`
                    : `/${ids}`
            }`
        );

        return data?.data || (isIdsArray ? [] : undefined);
    } catch (e) {
        const error = e as AxiosError;

        if (isServerError(error)) {
            if (connectionCount >= ConnectionCountLimit.atomic)
                throw new Error('Network Error', error);

            currentAtomicEndpoint = getNextEndpoint({
                endpointsList: endpoints.atomic,
                currentEndpoint: currentAtomicEndpoint,
            });

            await wait(1);
            return await getAssets(ids, connectionCount);
        }

        throw new Error(error.message);
    }
};

export const getAtomicAssetsByUser = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<UserInventoryType[] | undefined> => {
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

        return data?.rows as UserInventoryType[] | undefined;
    } catch (e) {
        const error = e as AxiosError;

        if (isServerError(error)) {
            if (connectionCount >= ConnectionCountLimit.wax)
                throw new Error('Network Error', error);

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

        throw new Error(error.message);
    }
};
