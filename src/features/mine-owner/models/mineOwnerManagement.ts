import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { forward } from 'effector/compat';
import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { MineOwnerManagementData } from 'entities/game-stat';
import { ContractDto } from 'entities/smartcontract';

let accountName: string | undefined;
export const getMineOwnerManagementData = createEffect(
    async ({ user }: { user: string }) => {
        accountName = user;
        const { data = null } = await axios.get<MineOwnerManagementData | null>(
            `${ENDPOINT}/game-api/statistic/mineowner/management`,
            {
                params: {
                    user,
                },
            }
        );

        return data;
    }
);
export const getContract = createEffect(
    async (mineOwnerData: MineOwnerManagementData | null) => {
        if (mineOwnerData) {
            const { data = null } = await axios.get<ContractDto | null>(
                `${ENDPOINT}/game-api/contract/${mineOwnerData.contract_id}`,
                {
                    params: {
                        user: accountName,
                    },
                }
            );

            return data;
        }
        return null;
    }
);

export const $mineOwnerManagementData =
    createStore<MineOwnerManagementData | null>(null).on(
        getMineOwnerManagementData.doneData,
        (_, data) => data
    );
export const $mineOwnerContract = createStore<ContractDto | null>(null).on(
    getContract.doneData,
    (_, data) => data
);

export const MineOwnerManagementDataGate = createGate<{ user: string }>(
    'MineOwnerManagementDataGate'
);

forward({
    from: MineOwnerManagementDataGate.open,
    to: getMineOwnerManagementData,
});

forward({
    from: $mineOwnerManagementData,
    to: getContract,
});
