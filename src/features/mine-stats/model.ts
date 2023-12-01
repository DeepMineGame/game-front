import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { ContractorStats, Roles } from 'entities/game-stat';

export const getMineOwnerStatEffect = createEffect(
    async ({ user }: { user: string }) => {
        const { data = [] } = await axios.get<ContractorStats[]>(
            `${ENDPOINT}/game-api/statistic/mineowner/mine_stats`,
            {
                params: {
                    user,
                },
            }
        );

        return data;
    }
);
export const $mineStats = createStore<ContractorStats[]>([]).on(
    getMineOwnerStatEffect.doneData,
    (_, data) => data
);

export const MineStatsGate = createGate<{
    user: string;
    role: Roles;
}>('MineStatsGate');

forward({
    from: MineStatsGate.open,
    to: getMineOwnerStatEffect,
});
