import {
    ConnectionCountLimit,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import { JsonRpc } from 'eosjs';
import { wait } from 'shared';

const jsonRpc = new JsonRpc(endpoints.wax[0], { fetch });

export const fetchDmeBalance = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<string> => {
    try {
        connectionCount++;

        const { rows } = await jsonRpc.get_table_rows({
            code: 'deepminedmet',
            index_position: 1,
            json: true,
            limit: '1',
            scope: searchParam,
            table: 'accounts',
        });

        const balance = rows?.[0]?.balance;
        const [value] = balance ? balance.split(' ') : [0];

        return Number(value).toFixed(4);
    } catch (error) {
        if (!(error as Error)?.message.includes('assertion failure')) {
            if (connectionCount >= ConnectionCountLimit.wax)
                throw new Error('Network Error', error as Error);

            jsonRpc.endpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: jsonRpc.endpoint,
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
