import { createEvent, createStore } from 'effector';
import { ContractorCabinStatus } from '../constants';

export const setContractorStatusEvent = createEvent<ContractorCabinStatus>();

export const $contractorStatus = createStore<ContractorCabinStatus>(
    ContractorCabinStatus.undefined
).on(setContractorStatusEvent, (_, status) => status);
