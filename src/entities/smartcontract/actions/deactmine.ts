import { deepminegame } from '../constants';

export function deactmine({
    waxUser,
    mineId,
}: {
    waxUser: string;
    mineId?: number;
}) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'deactmine',
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
