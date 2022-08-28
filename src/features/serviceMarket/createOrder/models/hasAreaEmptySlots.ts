import { createStore } from 'effector';
import { AreasDto } from 'entities/smartcontract';
import { getAreaByOwnerEffect } from './effects';

export const hasAreaEmptySlotsStore = createStore<boolean>(false).on(
    getAreaByOwnerEffect.doneData,
    (_hasAreaOrMine, { rows }: { rows?: AreasDto[] }) => {
        return Boolean(
            rows?.[0]?.mine_slots?.some(
                ({ reserved, mine_id, available_from }) =>
                    !reserved && !mine_id && Date.now() >= available_from * 1000
            )
        );
    }
);
