import { createStore } from 'effector';
import { isEmptyContractorSlot } from 'shared';
import { getMinesByOwnerEffect } from './effects';

export const hasMineEmptySlotsStore = createStore<boolean>(false).on(
    getMinesByOwnerEffect.doneData,
    (_hasAreaOrMine, data) => {
        return Boolean(
            data?.rows?.[0]?.contractor_slots?.some(isEmptyContractorSlot)
        );
    }
);
