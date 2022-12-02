import { combine, createEffect, createStore, forward } from 'effector';
import { getDmeAmount, getTableData, getTimeLeft } from 'shared';
import { createGate } from 'effector-react';
import {
    ActionDto,
    ContractDto,
    ContractorDto,
    ContractorsSearchType,
    ContractStatus,
    ContractType,
    getActionsTable,
    getContractConfig,
    getContractorsTableData,
    getMinesTableData,
    mapSearchParamForIndexPosition,
    mapSearchParamForIndexPositionToFindContracts,
    MineDto,
    searchBy,
    getAreasEffect,
    AreasDto,
    LayerDepth,
} from 'entities/smartcontract';

export const MiningPageGate = createGate<{ searchParam: string }>(
    'MiningPageGate'
);

export const getContractByExecutorEffect = createEffect<
    { searchParam: string },
    { rows: ContractDto[] } | undefined
>(({ searchParam }) =>
    getTableData(
        getContractConfig({
            searchParam,
            searchIdentification:
                mapSearchParamForIndexPositionToFindContracts.executorId,
            limit: 10000,
        })
    )
);

export const getMineByAssetEffect = createEffect<
    ContractDto | null | undefined,
    { rows: MineDto[] | null | undefined } | undefined
>((contract: ContractDto | null | undefined) =>
    contract
        ? getMinesTableData({
              searchParam: contract.client_asset_id,
              searchIdentificationType: searchBy.assetId,
          })
        : { rows: null }
);

export const getActionsForUserEffect = createEffect<
    { searchParam: number | string },
    { rows: ActionDto[] } | undefined
>(({ searchParam }) =>
    getActionsTable({
        searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
        searchParam,
    })
);
export const miningContractStore = createStore<ContractDto | null | undefined>(
    null
).on(getContractByExecutorEffect.doneData, (_, data) =>
    data?.rows?.find(
        ({ status, type }) =>
            type === ContractType.mineowner_contractor &&
            status === ContractStatus.active
    )
);

export const $currentMine = createStore<MineDto[] | null>(null).on(
    getMineByAssetEffect.doneData,
    (_, data) => data?.rows
);

export const actionsStore = createStore<ActionDto[] | null | undefined>(
    null
).on(getActionsForUserEffect.doneData, (_, data) => data?.rows);

export const getContractorEffect = createEffect<
    { searchParam: string },
    { rows: ContractorDto[] } | undefined
>(({ searchParam }) =>
    getContractorsTableData({
        searchParam,
        searchType: ContractorsSearchType.owner,
    })
);

export const contractorStore = createStore<ContractorDto | null>(null).on(
    getContractorEffect.doneData,
    (_, data) => data?.rows?.[0]
);

export const estimatesMiningTimeStore = createStore('').on(
    contractorStore,
    (_, contractorDto) =>
        contractorDto?.params?.est_time_min &&
        contractorDto?.params?.est_time_max
            ? `${getTimeLeft(
                  contractorDto?.params?.est_time_min
              )} - ${getTimeLeft(contractorDto?.params?.est_time_max)}`
            : ''
);

export const $miningArea = createStore<AreasDto | null>(null).on(
    getAreasEffect.doneData,
    (_, data) => data?.rows[0]
);

export const $dmeAmountEstimate = combine(
    {
        contractor: contractorStore,
        $miningArea,
    },
    ({ contractor, $miningArea: miningArea }) => {
        if (contractor && miningArea) {
            const estMiningPowerMin = contractor.params.est_mining_power_min;
            const estMiningPowerMax = contractor.params.est_mining_power_max;
            const currentLayerDepth = contractor.params.layer_depth;
            const currentLayer = `layer_${
                currentLayerDepth as LayerDepth
            }` as const;
            const { amount_capacity, current_amount } =
                miningArea[currentLayer];
            const dmeFullnessPercent =
                Number(current_amount) / Number(amount_capacity);

            return {
                min: getDmeAmount(estMiningPowerMin / dmeFullnessPercent),
                max: getDmeAmount(estMiningPowerMax / dmeFullnessPercent),
            };
        }

        return { min: 0, max: 0 };
    }
);

forward({
    from: contractorStore.map((contractor) => ({
        searchParam: contractor?.area_id || '',
    })),
    to: getAreasEffect,
});

forward({
    from: MiningPageGate.open,
    to: [
        getContractByExecutorEffect,
        getActionsForUserEffect,
        getContractorEffect,
    ],
});

forward({
    from: miningContractStore,
    to: getMineByAssetEffect,
});
