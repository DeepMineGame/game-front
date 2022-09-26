import { useMemo } from 'react';
import { useQuery } from 'shared';
import { orderFields } from 'entities/order';

export function useInitialValues() {
    const query = useQuery();

    return useMemo(() => {
        const preFilledContractType = query.get(orderFields.contractType);
        const preFilledIsClient = query.get(orderFields.isClient);

        return {
            is_client: preFilledContractType
                ? Number(preFilledContractType)
                : undefined,
            contract_type: preFilledIsClient
                ? Number(preFilledIsClient)
                : undefined,
            [orderFields.deadlineDurationInDays]: 1,
            [orderFields.deadlineDurationInHours]: 0,
        };
    }, [query]);
}
