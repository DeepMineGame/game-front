import { useEffect, useState } from 'react';

import { getTableData } from 'shared';
import { GetTableDataConfigType } from 'entities/smartcontract';
import { useAccountName } from './useAccountName';

export function useTableData<T>(
    getConfig: (accountName: string) => GetTableDataConfigType,
    needUpdate?: boolean
) {
    const accountName = useAccountName();
    const [result, setResult] = useState<{ rows: T[] }>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (needUpdate !== false) {
            if (accountName) {
                setIsLoading(true);
                getTableData<T>(getConfig(accountName))
                    .then((data) => {
                        setResult(data);
                    })
                    .finally(() => setIsLoading(false));
            } else {
                setResult(undefined);
            }
        }
    }, [accountName, getConfig, needUpdate]);

    return { data: result?.rows ?? [], isLoading };
}
