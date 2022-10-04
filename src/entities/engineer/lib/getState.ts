import {
    ACTIVE_STATUSES,
    INAUGURATION_STATUSES,
    WORK_STATUSES,
} from '../constants';
import { CabinState, CabinStatus } from '../types';

export const getState = (
    status: CabinStatus,
    inLocation: boolean
): CabinState => {
    const isWorking = WORK_STATUSES.includes(status);
    const isActive = ACTIVE_STATUSES.includes(status);
    const isNotInaugurated = INAUGURATION_STATUSES.includes(status);

    if (isNotInaugurated) {
        return CabinState.NotInaugurated;
    }

    if (isWorking) {
        return CabinState.Work;
    }

    if (isActive && inLocation) {
        return CabinState.Active;
    }

    return CabinState.Idle;
};
