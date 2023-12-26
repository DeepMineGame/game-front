import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { LandLordAreaInfo } from 'entities/game-stat';

export const getAreaInfoStatEffect = createEffect(
    async ({ user }: { user: string }) => {
        const { data = null } = await axios.get<LandLordAreaInfo>(
            `${ENDPOINT}/game-api/statistic/landlord/area_stats`,
            {
                params: {
                    user,
                },
            }
        );

        return data;
    }
);
export const $areaInfo = createStore<LandLordAreaInfo | null>(null).on(
    getAreaInfoStatEffect.doneData,
    (_, data) => data
);

export const AreaInfoGate = createGate<{
    user: string;
}>('AreaStatsGate');

forward({
    from: AreaInfoGate.open,
    to: getAreaInfoStatEffect,
});
