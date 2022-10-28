import {
    ConnectionCountLimit,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import axios from 'axios';
import { wait } from 'shared';

let currentWaxEndpoint = endpoints.wax[0];

export const fetchDmeBalance = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<string> => {
    try {
        connectionCount++;

        const { data } = await axios.post<{ rows: { balance: string }[] }>(
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

        const balance = data.rows?.[0]?.balance;
        const [value] = balance ? balance.split(' ') : [0];

        return Number(value).toFixed(4);
    } catch (error) {
        if (
            (error as Error).message === 'Network Error' ||
            ((error as any).response &&
                Number((error as any)?.response.status) >= 500)
        ) {
            if (connectionCount >= ConnectionCountLimit.wax)
                throw new Error('Network Error', error as Error);

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

        throw new Error((error as Error).message);
    }
};
