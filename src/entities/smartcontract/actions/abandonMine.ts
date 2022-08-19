import { deepminegame } from '../index';

export const abandonMine = (waxUser: string, mineId: number) => ({
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
});
