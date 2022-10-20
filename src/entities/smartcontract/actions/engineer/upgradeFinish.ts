import { deepminegame } from '../../index';

export function upgradeFinish(waxUser: string, contractId: number) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'engupgfinish',
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
