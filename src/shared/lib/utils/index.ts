import { ConnectionCountLimit, endpoints } from 'app/constants';
import axios from 'axios';
import {
    ContractDto,
    ContractType,
    GetTableDataConfigType,
} from 'entities/smartcontract';
import { nodeUrlSwitcher } from './node-url-switcher';

// eslint-disable-next-line prefer-const
let [currentWaxEndpoint] = endpoints.wax;

export const getTableData = async <T>(
    config: GetTableDataConfigType,
    connectionCount = 0
): Promise<{ rows: T[] } | undefined> => {
    let fetchedData;

    await nodeUrlSwitcher(
        async () => {
            connectionCount++;

            const { data } = await axios.post<{ rows: T[] }>(
                `${currentWaxEndpoint}/v1/chain/get_table_rows`,
                {
                    json: 'true',
                    reverse: false,
                    show_payer: false,
                    ...config,
                }
            );

            fetchedData = data;
        },
        {
            connectionCount,
            connectionCountLimit: ConnectionCountLimit.wax,
            currentEndpoint: currentWaxEndpoint,
            endpointsList: endpoints.wax,
        }
    );

    return fetchedData;
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

export const getDmeAmount = (value: number | string) => {
    if (Number.isNaN(value)) return 0;

    return Number(value) / 10 ** 8;
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
export { isServerError } from './is-server-error';
export { nodeUrlSwitcher } from './node-url-switcher';
