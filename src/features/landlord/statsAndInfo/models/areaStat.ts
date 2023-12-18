import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { LandlordAreaStat } from 'entities/game-stat';

export const getAreaStatsStatEffect = createEffect(
    async ({ user }: { user: string }) => {
        const { data = [] } = await axios.get<LandlordAreaStat[]>(
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
export const $areaStats = createStore<LandlordAreaStat[]>([]).on(
    getAreaStatsStatEffect.doneData,
    (_, data) => data
);

export const AreaStatsGate = createGate<{
    user: string;
}>('AreaStatsGate');

forward({
    from: AreaStatsGate.open,
    to: getAreaStatsStatEffect,
});
