import { deepminegame } from '../constants';

export function setupMine({
    waxUser,
    contractId,
    duration = 0,
    amount = 0,
}: {
    waxUser: string;
    contractId: number;
    duration?: number;
    amount?: number;
}) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'setupmine',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    contract_id: contractId,
                    duration,
                    amount,
                },
            },
        ],
    };
}
