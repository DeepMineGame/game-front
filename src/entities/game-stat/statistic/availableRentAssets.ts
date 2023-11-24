import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { AssetStruct } from './mining';

export const getAvailableRentAsset = async ({
    searchParam,
}: {
    searchParam: string;
}) => {
    const { data } = await axios.get<{ user: string }, { data: AssetStruct[] }>(
        `${ENDPOINT}/statistic/available_rent_assets`,
        {
            params: {
                user: searchParam,
            },
        }
    );
    return data;
};
