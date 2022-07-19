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

enum Role {
    contractor = 'contractor',
    mineOwner = 'mineOwner',
    landlord = 'landlord',
}

export const getUserRoleInContract = (
    contract: ContractDto,
    account: string
): Role | null => {
    let role: Role | null = null;

    if (contract.type === ContractType.landlord_mineowner) {
        if (contract.client === account) role = Role.landlord;
        else if (contract.executor === account) role = Role.mineOwner;
    } else if (contract.type === ContractType.mineowner_contractor) {
        if (contract.client === account) role = Role.mineOwner;
        else if (contract.executor === account) role = Role.contractor;
    }

    return role;
};

export * from './getNftImagePath';

export * from './uniqBy';
export * from './addDaysToCurrentDateUnixTime';
export * from './getDaysSelectItem';
