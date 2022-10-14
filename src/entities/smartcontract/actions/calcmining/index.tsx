import { deepmineming } from '../../constants';

export function calcmining({ waxUser }: { waxUser: string }) {
    return {
        actions: [
            {
                account: deepmineming,
                name: 'calcmining',
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
