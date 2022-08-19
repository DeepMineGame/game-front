import { createEffect } from 'effector';
import { getTableData } from 'shared';
import {
    getAreaConfig,
    getMinesEffect,
    searchBy,
} from 'entities/smartcontract';

export const getAreaByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getTableData(getAreaConfig(searchParam, searchBy.owner));
    }
);

export const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesEffect({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);
