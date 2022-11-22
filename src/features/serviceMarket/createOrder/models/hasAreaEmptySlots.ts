import { createStore } from 'effector';
import { getAreaByOwnerEffect } from './effects';

export const hasAreaEmptySlotsStore = createStore<boolean>(false).on(
    getAreaByOwnerEffect.doneData,
    (_hasAreaOrMine, data) => {
        return Boolean(
            data?.rows?.[0]?.mine_slots?.some(
                ({ reserved, mine_id, available_from }) =>
                    !reserved && !mine_id && Date.now() >= available_from * 1000
            )
        );
    }
);
