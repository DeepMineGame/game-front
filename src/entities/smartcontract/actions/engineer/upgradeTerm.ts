import { deepmineengr } from '../../index';

export function upgradeTerm(waxUser: string, contractId: number) {
    return {
        actions: [
            {
                account: deepmineengr,
                name: 'engupgterm',
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
