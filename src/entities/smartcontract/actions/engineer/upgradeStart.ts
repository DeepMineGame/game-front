import { deepmineengr } from '../../index';

export function upgradeStart(
    waxUser: string,
    contractId: string | number,
    improved: boolean
) {
    return {
        actions: [
            {
                account: deepmineengr,
                name: 'engupgstart',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    contract_id: contractId,
                    improved,
                },
            },
        ],
    };
}
