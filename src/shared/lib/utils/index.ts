import { JsonRpc } from 'eosjs';
import {
    ConnectionCountLimit,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import {
    ContractDto,
    ContractType,
    GetTableDataConfigType,
} from 'entities/smartcontract';
import { wait } from './wait';

const jsonRpc = new JsonRpc(endpoints.wax[0], { fetch });

export const getTableData = async <T>(
    config: GetTableDataConfigType,
    connectionCount = 0
): Promise<T[]> => {
    try {
        connectionCount++;

        const { rows } = await jsonRpc.get_table_rows({
            json: 'true',
            reverse: false,
            show_payer: false,
            ...config,
        });

        return rows;
    } catch (error) {
        if (!(error as Error)?.message.includes('assertion failure')) {
            if (connectionCount >= ConnectionCountLimit.wax)
                throw new Error('Network Error', error as Error);

            jsonRpc.endpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: jsonRpc.endpoint,
            });

            await wait(1);
            return await getTableData(config, connectionCount);
        }

        throw new Error((error as Error).message);
    }
};

export const getUserRoleInContract = (
    contract: ContractDto,
    account: string
):
    | 'contractor'
    | 'mineOwnerContractor'
    | 'mineOwnerLandlord'
    | 'landlord'
    | null => {
    if (contract.type === ContractType.landlord_mineowner) {
        if (contract.client === account) return 'landlord';
        if (contract.executor === account) return 'mineOwnerLandlord';
    }
    if (contract.type === ContractType.mineowner_contractor) {
        if (contract.client === account) return 'mineOwnerContractor';
        if (contract.executor === account) return 'contractor';
    }

    return null;
};

export const getDmeAmount = (value: number) => {
    if (Number.isNaN(value)) return 0;

    return value / 10 ** 8;
};

export * from './getNftImagePath';
export * from './uniqBy';
export * from './addDaysToCurrentDateUnixTime';
export * from './getLabelSelectItem';
export * from './isEmptyContractorSlot';
export { getErrorCode } from './getErrorCode';
export {
    getUpgradeRarity,
    getUpgradeType,
    parseAttrs,
} from './get-upgrade-attr';
export { createErrorMessage } from './create-error-message';
export * from './merge-assets';
export { isAssetAvailable } from './is-asset-available';
export { getGameAssets } from './get-game-assets';
export { wait } from './wait';
