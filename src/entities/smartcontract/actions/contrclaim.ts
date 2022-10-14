import { deepmineming } from '../constants';

export function contrclaim({ waxUser }: { waxUser: string }) {
    return {
        actions: [
            {
                account: deepmineming,
                name: 'contrclaim',
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
