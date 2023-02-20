import axios from 'axios';
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
                    ? `?ids=${ids.filter((i) => i).join(',')}&limit=1000`
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

    await poolRequest(RequestSubject.Atomic, async (endpoint: string) => {
        const { data } = await axios.get(
            `${endpoint}/assets?collection_name=deepminegame&limit=1000&order=desc&sort=asset_id&owner=${searchParam}`
        );

        const rows = (data?.data || []) as AssetDataType[];

        fetchedData = rows.map((el) => {
            return {
                asset_id: el.asset_id,
                template_id: Number(el.template.template_id),
                schema_name: el.schema.schema_name,
            };
        });
    });

    return fetchedData;
};
