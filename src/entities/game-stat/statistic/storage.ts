import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { AssetStruct } from './mining';

export const getStorageAssets = async ({
    searchParam,
    offset,
}: {
    searchParam: string;
    offset?: number;
}) => {
    const { data } = await axios.get<{ user: string }, { data: AssetStruct[] }>(
        `${ENDPOINT}/statistic/storage`,
        {
            params: {
                user: searchParam,
                offset,
            },
        }
    );
    return data;
};
