import { useEffect, useState } from 'react';

import { getTableData } from 'features';
import {
    GetTableDataConfigType,
    GetTableDataResponseType,
} from 'entities/smartcontracts';
import { useAccountName } from './useAccountName';

export function useTableData<T>(
    getConfig: (accountName: string) => GetTableDataConfigType,
    needUpdate?: boolean
) {
    const accountName = useAccountName();
    const [result, setResult] = useState<
        GetTableDataResponseType<T> | undefined
    >(undefined);

    useEffect(() => {
        if (needUpdate !== false) {
            if (accountName) {
                getTableData(getConfig(accountName)).then((data) => {
                    setResult(data);
                });
            } else {
                setResult(undefined);
            }
        }
    }, [accountName, getConfig, needUpdate]);

    return result?.rows ?? [];
}
