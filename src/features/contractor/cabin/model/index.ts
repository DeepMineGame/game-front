import { createEvent, createStore } from 'effector';
// eslint-disable-next-line no-restricted-imports
import { CABIN_STATUS } from 'pages/contractor/contractorCabin/constants';

export const setContractorStatusEvent = createEvent<CABIN_STATUS>();

export const $contractorStatus = createStore<CABIN_STATUS>(
    CABIN_STATUS.undefined
).on(setContractorStatusEvent, (_, status) => status);
