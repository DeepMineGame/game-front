import { createStore } from 'effector';
import { isEmptyContractorSlot } from 'shared';
import { MineDto } from 'entities/smartcontract';
import { getMinesByOwnerEffect } from './effects';

export const hasMineEmptySlotsStore = createStore<boolean>(false).on(
    getMinesByOwnerEffect.doneData,
    (_hasAreaOrMine, { rows }: { rows?: MineDto[] }) => {
        return Boolean(
            rows?.[0]?.contractor_slots?.some(isEmptyContractorSlot)
        );
    }
);
