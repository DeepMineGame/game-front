import axios from 'axios';

import { WAX_GET_TABLE_ENDPOINT } from 'app';
import { GetTableDataConfigType } from 'entities/smartcontract';

export const getTableData = async (config: GetTableDataConfigType) => {
    const { data } = await axios.post(WAX_GET_TABLE_ENDPOINT, {
        json: 'true',
        reverse: false,
        show_payer: false,
        ...config,
    });

    return data;
};
export * from './getNftImagePath';
