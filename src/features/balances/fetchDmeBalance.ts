import { CONNECTION_TIMEOUT } from 'app/constants';
import { RequestSubject, poolRequest } from 'shared';

export const fetchDmeBalance = async ({
    searchParam,
}: {
    searchParam: string;
}): Promise<string | undefined> => {
    let fetchedData;

    await poolRequest(RequestSubject.Wax, async (endpoint: string) => {
        const abortController = new AbortController();

        const timerId = setTimeout(
            () => abortController.abort(),
            CONNECTION_TIMEOUT
        );

        const data = await fetch(`${endpoint}/v1/chain/get_table_rows`, {
            body: JSON.stringify({
                code: 'deepminedmet',
                index_position: 1,
                json: true,
                limit: '1',
                scope: searchParam,
                table: 'accounts',
            }),
            method: 'POST',
            signal: abortController.signal,
        });

        clearTimeout(timerId);

        const balance = (await data.json()).rows?.[0]?.balance;
        const [value] = balance ? balance.split(' ') : [0];

        fetchedData = Number(value).toFixed(4);
    });

    return fetchedData;
};
