import { deepminegame } from '../constants';

export function termContract({
    waxUser,
    contractId,
}: {
    waxUser: string;
    contractId: number;
}) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'termcontract',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    contract_id: contractId,
                    demand_penalty: false,
                },
            },
        ],
    };
}
