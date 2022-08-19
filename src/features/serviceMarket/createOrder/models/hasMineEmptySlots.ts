import { createStore } from 'effector';
import { MineDto } from 'entities/smartcontract';
import { getMinesByOwnerEffect } from './effects';

export const hasMineEmptySlotsStore = createStore<boolean>(false).on(
    getMinesByOwnerEffect.doneData,
    (hasAreaOrMine, { rows }: { rows?: MineDto[] }) =>
        Boolean(
            rows?.[0]?.contractor_slots?.filter(({ reserved }) => reserved)
                ?.length !== rows?.[0]?.contractor_slots?.length
        )
);
