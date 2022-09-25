import { deepmineengr } from '../../index';

export function upgradeLevel(waxUser: string) {
    return {
        actions: [
            {
                account: deepmineengr,
                name: 'enlevelup',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                },
            },
        ],
    };
}
