import {
    ConnectionCountLimit,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import axios, { AxiosError } from 'axios';
import { wait } from 'shared';

let [currentWaxEndpoint] = endpoints.wax;

export const fetchDmeBalance = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<string> => {
    try {
        connectionCount++;

        const {
            data: { rows },
        } = await axios.post<{ rows: { balance: string }[] }>(
            `${currentWaxEndpoint}/v1/chain/get_table_rows`,
            {
                code: 'deepminedmet',
                index_position: 1,
                json: true,
                limit: '1',
                scope: searchParam,
                table: 'accounts',
            }
        );

        const balance = rows?.[0]?.balance;
        const [value] = balance ? balance.split(' ') : [0];

        return Number(value).toFixed(4);
    } catch (e) {
        const error = e as AxiosError;

        if (
            error.message === 'Network Error' ||
            (error.response && Number(error?.response.status) >= 500)
        ) {
            if (connectionCount >= ConnectionCountLimit.wax)
                throw new Error('Network Error', error);

            currentWaxEndpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: currentWaxEndpoint,
            });

            await wait(1);
            return await fetchDmeBalance({
                searchParam,
                connectionCount,
            });
        }

        throw new Error(error.message);
    }
};
