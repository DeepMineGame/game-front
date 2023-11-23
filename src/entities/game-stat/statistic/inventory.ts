import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { AssetStruct } from './mining';

export const getInventoryAssets = async ({
    searchParam,
    offset,
}: {
    searchParam: string;
    offset?: string;
}) => {
    const { data } = await axios.get<{ user: string }, { data: AssetStruct[] }>(
        `${ENDPOINT}/statistic/unused_inventory`,
        {
            params: {
                user: searchParam,
                offset,
            },
        }
    );
    return data;
};
