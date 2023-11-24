import { deepminesmrt } from '../constants';

export function refrentcontr({
    waxUser,
    contractId,
}: {
    waxUser: string;
    contractId: number;
}) {
    return {
        actions: [
            {
                account: deepminesmrt,
                name: 'refrentcontr',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    rent_contract_id: contractId,
                },
            },
        ],
    };
}
