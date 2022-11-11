import { ENDPOINT } from 'app/constants';
import axios from 'axios';
import { LastMiningStatus } from '../constants';

export const getLastMiningStatus = async ({
    searchParam,
}: {
    searchParam: string;
}) => {
    const { data } = await axios.get<{ status: LastMiningStatus }>(
        `${ENDPOINT}/statistic/mine/last`,
        { params: { user: searchParam } }
    );

    return data;
};
