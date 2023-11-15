import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app/constants';
import { AssetStruct } from '../game-stat';

export const getRentInventory = async ({
    searchParam,
}: {
    searchParam: string;
}) => {
    const { data } = await axios.get<AssetStruct[]>(
        `${ENDPOINT}/rent-market-api/inventory`,
        { params: { user: searchParam }, ...defaultConfig }
    );
    return data;
};
