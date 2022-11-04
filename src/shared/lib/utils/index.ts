import axios from 'axios';

import { WAX_GET_TABLE_ENDPOINT } from 'app';
import {
    ContractDto,
    ContractType,
    GetTableDataConfigType,
} from 'entities/smartcontract';

export const getTableData = async (config: GetTableDataConfigType) => {
    const { data } = await axios.post(WAX_GET_TABLE_ENDPOINT, {
        json: 'true',
        reverse: false,
        show_payer: false,
        ...config,
    });

    return data;
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
