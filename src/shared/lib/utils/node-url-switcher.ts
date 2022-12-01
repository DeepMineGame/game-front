import { ConnectionCountLimit } from 'app/constants';
import { isServerError } from './is-server-error';
import { pool } from './requests/pool';

export enum RequestSubject {
    Wax = 1,
    Atomic = 2,
}

export const poolRequest = async (
    subject: RequestSubject,
    requestFn: (endpoint: string) => Promise<any>
): Promise<any> => {
    let tries = 0;

    const limit =
        subject === RequestSubject.Wax
            ? ConnectionCountLimit.wax
            : ConnectionCountLimit.atomic;

    while (tries < limit) {
        const endpoint =
            subject === RequestSubject.Wax
                ? pool.getWaxEndpoint()
                : pool.getAtomicEndpoint();

        try {
            await requestFn(endpoint.url);
            pool.onReqComplete(endpoint);
            return;
        } catch (e) {
            const error = e as Error & { response: { status: number } };

            pool.onReqComplete(endpoint, error);
            tries++;

            if (!isServerError(error)) {
                throw new Error(error.message);
            }

            if (tries >= limit) {
                // TODO: remove temp debug log
                // eslint-disable-next-line no-console
                console.log('Network error', {
                    tries,
                    limit,
                    endpoint: endpoint.url,
                });
                throw new Error('Network Error', error);
            }
        }
    }
};
