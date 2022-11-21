import {
    ConnectionCountLimit,
    CONNECTION_TIMEOUT,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import { nodeUrlSwitcher } from 'shared';

let [currentWaxEndpoint] = endpoints.wax;

export const fetchDmeBalance = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<string | undefined> => {
    let fetchedData;
    const { abort, signal } = new AbortController();

    await nodeUrlSwitcher(
        async () => {
            connectionCount++;

            const timerId = setTimeout(() => abort(), CONNECTION_TIMEOUT);

            const data = await fetch(
                `${currentWaxEndpoint}/v1/chain/get_table_rows`,
                {
                    body: JSON.stringify({
                        code: 'deepminedmet',
                        index_position: 1,
                        json: true,
                        limit: '1',
                        scope: searchParam,
                        table: 'accounts',
                    }),
                    method: 'POST',
                    signal,
                }
            );

            clearTimeout(timerId);

            const balance = (await data.json()).rows?.[0]?.balance;
            const [value] = balance ? balance.split(' ') : [0];

            fetchedData = Number(value).toFixed(4);
        },
        () => {
            currentWaxEndpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: currentWaxEndpoint,
            });
        },
        { connectionCount, connectionCountLimit: ConnectionCountLimit.wax }
    );

    return fetchedData;
};
