import { useQuery } from 'shared';
import { createContrFormFields } from 'entities/smartcontract';

export const useInitialValues = () => {
    const query = useQuery();
    const preFilledContractType = query.get(createContrFormFields.contractType);
    const preFilledIsClient = query.get(createContrFormFields.isClient);

    return {
        ...(preFilledContractType && {
            [createContrFormFields.contractType]: Number(preFilledContractType),
        }),
        ...(preFilledIsClient && {
            [createContrFormFields.isClient]: Number(preFilledIsClient),
        }),
    };
};
