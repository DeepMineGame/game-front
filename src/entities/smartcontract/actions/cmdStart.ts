import { deepminegame } from '../constants';

export function cmdStart({
    waxUser,
    mineId,
    depthTo,
}: {
    waxUser: string;
    mineId: number;
    depthTo: number;
}) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'cmdstart',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    mine_id: mineId,
                    depth_to: depthTo,
                },
            },
        ],
    };
}
