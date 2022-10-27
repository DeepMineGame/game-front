import {
    ConnectionCountLimit,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import { wait } from 'shared';
import { JsonRpc } from 'eosjs';

const jsonRpc = new JsonRpc(endpoints.wax[0], { fetch });

export const fetchWaxBalance = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<string> => {
    try {
        connectionCount++;

        const rows = await jsonRpc.get_currency_balance(
            'eosio.token',
            searchParam,
            'WAX'
        );

        const [value] = rows.length ? rows[0].split(' ') : [0];

        return Number(value).toFixed(1);
    } catch (error) {
        if (!(error as Error)?.message.includes('assertion failure')) {
            if (connectionCount >= ConnectionCountLimit.wax)
                throw new Error('Network Error', error as Error);

            jsonRpc.endpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: jsonRpc.endpoint,
            });

            await wait(1);
            return await fetchWaxBalance({
                searchParam,
                connectionCount,
            });
        }

        throw new Error((error as Error).message);
    }
};
