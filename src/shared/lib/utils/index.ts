import { CONNECTION_TIMEOUT } from 'app/constants';
import {
    ContractDto,
    ContractType,
    GetTableDataConfigType,
} from 'entities/smartcontract';
import { RequestSubject, poolRequest } from './node-url-switcher';

export const getTableData = async <T>(
    config: GetTableDataConfigType
): Promise<{ rows: T[] } | undefined> => {
    let fetchedData;

    await poolRequest(RequestSubject.Wax, async (endpoint: string) => {
        const abortController = new AbortController();

        const timerId = setTimeout(
            () => abortController.abort(),
            CONNECTION_TIMEOUT
        );

        const data = await fetch(`${endpoint}/v1/chain/get_table_rows`, {
            body: JSON.stringify({
                json: 'true',
                reverse: false,
                show_payer: false,
                ...config,
            }),
            method: 'POST',
            signal: abortController.signal,
        });

        clearTimeout(timerId);
        fetchedData = await data.json();
    });

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
export { poolRequest, RequestSubject } from './node-url-switcher';
