import { createStore } from 'effector';
import { AreasDto } from 'entities/smartcontract';
import { getAreaByOwnerEffect } from './effects';

export const hasAreaEmptySlotsStore = createStore<boolean>(false).on(
    getAreaByOwnerEffect.doneData,
    (hasAreaOrMine, { rows }: { rows?: AreasDto[] }) =>
        Boolean(
            rows?.[0]?.mine_slots?.filter(({ reserved }) => reserved)
                ?.length !== rows?.[0]?.mine_slots?.length
        )
);
