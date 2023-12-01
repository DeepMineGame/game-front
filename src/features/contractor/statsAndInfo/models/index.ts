import { createEffect, createStore, forward } from 'effector';
import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { createGate } from 'effector-react';
import { ContractorStats } from 'entities/game-stat';

export const getContractorStatEffect = createEffect(
    async ({ user }: { user: string }) => {
        const { data = [] } = await axios.get<ContractorStats[]>(
            `${ENDPOINT}/game-api/statistic/contractor/my_stats`,
            {
                params: {
                    user,
                },
            }
        );

        return data;
    }
);
export const $contractorStats = createStore<null | ContractorStats[]>(null).on(
    getContractorStatEffect.doneData,
    (_, data) => data
);

export const ContractorStatsGate = createGate<{ user: string }>(
    'ContractorStatsGate'
);

forward({
    from: ContractorStatsGate.open,
    to: getContractorStatEffect,
});
