import { deepmineengr } from '../../index';

export function upgradeFinish(waxUser: string, contractId: number) {
    return {
        actions: [
            {
                account: deepmineengr,
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
