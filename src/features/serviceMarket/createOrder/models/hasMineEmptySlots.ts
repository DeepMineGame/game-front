import { createStore } from 'effector';
import { isEmptyContractorSlot } from 'shared';
import { getMinesByOwnerEffect } from './effects';

export const hasMineEmptySlotsStore = createStore(false).on(
    getMinesByOwnerEffect.doneData,
    (_, [mine]) => Boolean(mine?.contractor_slots?.some(isEmptyContractorSlot))
);
