import { useMemo } from 'react';
import { useQuery } from 'shared';
import { orderFields } from 'entities/order';

export function useInitialValues() {
    const query = useQuery();

    return useMemo(() => {
        const preFilledContractType = query.get(orderFields.contractType);
        const preFilledIsClient = query.get(orderFields.isClient);

        return {
            is_client: preFilledIsClient
                ? Number(preFilledIsClient)
                : undefined,
            contract_type: preFilledContractType
                ? Number(preFilledContractType)
                : undefined,
            [orderFields.deadlineDurationInDays]: 1,
            [orderFields.deadlineDurationInHours]: 0,
        };
    }, [query]);
}
