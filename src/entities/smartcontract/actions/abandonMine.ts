import { deepminegame } from '../index';

export function abandonMine(waxUser: string, mineId: number) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'abandonmine',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    mine_id: mineId,
                },
            },
        ],
    };
}
