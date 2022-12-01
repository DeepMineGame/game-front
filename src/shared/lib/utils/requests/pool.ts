import { endpoints, minLoaderDuration } from 'app/constants';
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

    private startLoaderTime: Date = new Date();

    private loading: boolean = false;

    private loaderTimeout: number | undefined;

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
        this.loading = true;

        if (!this.loading) {
            this.startLoaderTime = new Date();
            this.loading = true;
        }

        setBlockchainConnectionUnstable(true);
        return endpoint;
    }

    getAtomicEndpoint(): EndpointStatistic {
        const endpoint = bestEndpoint(this.atomicEndpoints);
        endpoint.processing++;

        if (!this.loading) {
            this.startLoaderTime = new Date();
            this.loading = true;
        }

        setBlockchainConnectionUnstable(true);
        return endpoint;
    }

    onReqComplete(
        endpoint: EndpointStatistic,
        err: Error | undefined = undefined
    ) {
        if (err) {
            endpoint.networkErrors++;
        }

        endpoint.processing--;
        this.turnOffLoading();
    }

    turnOffLoading() {
        if (!this.loading) {
            return;
        }

        const inProcessing = [
            ...this.atomicEndpoints,
            ...this.waxEndpoints,
        ].reduce((sum, el) => sum + el.processing, 0);

        if (inProcessing > 0) {
            return;
        }

        const currentDuration =
            Number(new Date()) - Number(this.startLoaderTime);

        if (currentDuration < minLoaderDuration) {
            if (this.loaderTimeout) {
                return;
            }

            this.loaderTimeout = Number(
                setTimeout(
                    this.turnOffLoading.bind(this),
                    minLoaderDuration - currentDuration
                )
            );
        }

        setBlockchainConnectionUnstable(false);
        clearTimeout(this.loaderTimeout);
        this.loaderTimeout = undefined;
    }
}

export const pool = new EndpointsPool();
