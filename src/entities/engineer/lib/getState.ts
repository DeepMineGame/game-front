import { ACTIVE_STATUSES, WORK_STATUSES } from '../constants';
import { CabinState, CabinStatus } from '../types';

export const getState = (status: CabinStatus): CabinState => {
    const isWorking = WORK_STATUSES.includes(status);
    const isActive = ACTIVE_STATUSES.includes(status);

    if (isWorking) {
        return CabinState.Work;
    }

    if (isActive) {
        return CabinState.Active;
    }

    return CabinState.Idle;
};
