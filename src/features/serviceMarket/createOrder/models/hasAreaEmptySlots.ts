import { createStore } from 'effector';
import { getAreaByOwnerEffect } from './effects';

export const hasAreaEmptySlotsStore = createStore(false).on(
    getAreaByOwnerEffect.doneData,
    (_hasAreaOrMine, [area]) =>
        Boolean(
            area?.mine_slots?.some(
                ({ reserved, mine_id, available_from }) =>
                    !reserved && !mine_id && Date.now() >= available_from * 1000
            )
        )
);
