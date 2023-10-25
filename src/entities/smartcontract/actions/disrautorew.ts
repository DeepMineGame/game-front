import { deepminesmrt } from '../constants';

export function disrautorew({
    waxUser,
    contractId,
}: {
    waxUser: string;
    contractId?: number;
}) {
    return {
        actions: [
            {
                account: deepminesmrt,
                name: 'disrautorew',
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
