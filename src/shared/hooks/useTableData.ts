import { useEffect, useState } from 'react';

import { getTableData } from 'features';
import {
    GetTableDataConfigType,
    GetTableDataResponseType,
} from 'entities/smartcontracts';
import { useAccountName } from './useAccountName';

export function useTableData<T>(
    getConfig: (accountName: string) => GetTableDataConfigType
) {
    const accountName = useAccountName();
    const [result, setResult] = useState<
        GetTableDataResponseType<T> | undefined
    >(undefined);

    useEffect(() => {
        if (accountName) {
            getTableData(getConfig(accountName)).then((data) => {
                setResult(data);
            });
        } else {
            setResult(undefined);
        }
    }, [accountName, getConfig]);

    return result?.rows ?? [];
}
