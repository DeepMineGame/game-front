import { deepminegame } from '../constants';

export function contrclaim({ waxUser }: { waxUser: string }) {
    return {
        actions: [
            {
                account: deepminegame,
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
