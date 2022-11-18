import axios from 'axios';
import {
    endpoints,
    ConnectionCountLimit,
    getNextEndpoint,
} from 'app/constants';
import { nodeUrlSwitcher } from 'shared';
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
    let fetchedData: any;

    await nodeUrlSwitcher(
        async () => {
            connectionCount++;

            const { data } = await axios.get(
                `${currentAtomicEndpoint}/assets${
                    isIdsArray
                        ? `?ids=${ids.filter((i) => i).join(',')}`
                        : `/${ids}`
                }`
            );

            fetchedData = data?.data || (isIdsArray ? [] : undefined);
        },
        () => {
            currentAtomicEndpoint = getNextEndpoint({
                endpointsList: endpoints.atomic,
                currentEndpoint: currentAtomicEndpoint,
            });
        },
        { connectionCount, connectionCountLimit: ConnectionCountLimit.atomic }
    );

    return fetchedData;
};

export const getAtomicAssetsByUser = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<UserInventoryType[] | undefined> => {
    let fetchedData;

    await nodeUrlSwitcher(
        async () => {
            connectionCount++;

            const data = await fetch(
                `${currentWaxEndpoint}/v1/chain/get_table_rows`,
                {
                    body: JSON.stringify({
                        json: true,
                        code: 'atomicassets',
                        scope: searchParam,
                        table: 'assets',
                        index_position: 1,
                        limit: 500,
                        reverse: false,
                        show_payer: false,
                    }),
                    method: 'POST',
                }
            );

            fetchedData = (await data.json()).rows;
        },
        () => {
            currentWaxEndpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: currentWaxEndpoint,
            });
        },
        { connectionCount, connectionCountLimit: ConnectionCountLimit.wax }
    );

    return fetchedData;
};
