import axios from 'axios';
import { CONNECTION_TIMEOUT } from 'app/constants';
import { RequestSubject, poolRequest } from 'shared';
import { UserInventoryType } from '../smartcontract';
import { AssetDataType } from './types';

export const getAssets = async <T>(
    ids: T
): Promise<
    T extends string[] ? AssetDataType[] : AssetDataType | undefined
> => {
    const isIdsArray = Array.isArray(ids);
    let fetchedData: any;

    await poolRequest(RequestSubject.Atomic, async (endpoint: string) => {
        const { data } = await axios.get(
            `${endpoint}/assets${
                isIdsArray
                    ? `?ids=${ids.filter((i) => i).join(',')}`
                    : `/${ids}`
            }`
        );

        fetchedData = data?.data || (isIdsArray ? [] : undefined);
    });

    return fetchedData;
};

export const getAtomicAssetsByUser = async ({
    searchParam,
}: {
    searchParam: string;
}): Promise<UserInventoryType[] | undefined> => {
    let fetchedData;

    await poolRequest(RequestSubject.Wax, async (endpoint: string) => {
        const abortController = new AbortController();

        const timerId = setTimeout(
            () => abortController.abort(),
            CONNECTION_TIMEOUT
        );

        const data = await fetch(`${endpoint}/v1/chain/get_table_rows`, {
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
            signal: abortController.signal,
        });

        clearTimeout(timerId);
        fetchedData = (await data.json()).rows;
    });

    return fetchedData;
};
