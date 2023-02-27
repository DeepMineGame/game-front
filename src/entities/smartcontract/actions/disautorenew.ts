import { deepminesmrt } from '../constants';

export function disautorenew({
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
                name: 'disautorenew',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    contract_id: contractId,
                },
            },
        ],
    };
}
