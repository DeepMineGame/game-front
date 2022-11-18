import {
    ConnectionCountLimit,
    defaultConfig,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import axios from 'axios';
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

    await nodeUrlSwitcher(
        async () => {
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
                    ...defaultConfig,
                }
            );

            const balance = rows?.[0]?.balance;
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
