import { deepminegame } from '../constants';

export function moclaim({ waxUser }: { waxUser: string }) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'moclaim',
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
