import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { AssetStruct } from './mining';

export const getAssetsStatistic = async ({
    searchParam,
}: {
    searchParam: string;
}) => {
    const { data } = await axios.get<{ user: string }, { data: AssetStruct }>(
        `${ENDPOINT}/game-api/assets/asset/${searchParam}`
    );
    return data;
};
