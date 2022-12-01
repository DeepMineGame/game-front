import { endpoints } from 'app/constants';
import { setBlockchainConnectionUnstable } from 'features';

const networkErrorsWeight = 10;

type EndpointStatistic = {
    url: string;
    processing: number;
    networkErrors: number;
};

const newStat = (url: string): EndpointStatistic => {
    return {
        url,
        processing: 0,
        networkErrors: 0,
    };
};

const bestEndpoint = (
    endpointsList: EndpointStatistic[]
): EndpointStatistic => {
    let minIndex = 0;
    let minValue = Number.MAX_SAFE_INTEGER;

    endpointsList.forEach((el, index) => {
        const rate = el.processing + el.networkErrors * networkErrorsWeight;

        if (rate < minValue) {
            minIndex = index;
            minValue = rate;
        }
    });

    return endpointsList[minIndex];
};

class EndpointsPool {
    private waxEndpoints: EndpointStatistic[] = [];

    private atomicEndpoints: EndpointStatistic[] = [];

    constructor() {
        endpoints.wax.forEach((url) => {
            this.waxEndpoints.push(newStat(url));
        });

        endpoints.atomic.forEach((url) => {
            this.atomicEndpoints.push(newStat(url));
        });
    }

    getWaxEndpoint(): EndpointStatistic {
        const endpoint = bestEndpoint(this.waxEndpoints);
        endpoint.processing++;

        setBlockchainConnectionUnstable(endpoint.processing > 0);
        return endpoint;
    }

    getAtomicEndpoint(): EndpointStatistic {
        const endpoint = bestEndpoint(this.atomicEndpoints);
        endpoint.processing++;

        setBlockchainConnectionUnstable(endpoint.processing > 0);
        return endpoint;
    }

    // eslint-disable-next-line class-methods-use-this
    onReqComplete(
        endpoint: EndpointStatistic,
        err: Error | undefined = undefined
    ) {
        if (err) {
            endpoint.networkErrors++;
        }

        endpoint.processing--;
        setBlockchainConnectionUnstable(endpoint.processing > 0);
    }
}

export const pool = new EndpointsPool();
