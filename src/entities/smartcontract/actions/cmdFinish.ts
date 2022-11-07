import { deepminegame } from '../constants';

export function cmdFinish({
    waxUser,
    mineId,
}: {
    waxUser: string;
    mineId: number;
}) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'cmdfinish',
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
