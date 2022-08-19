import { deepminegame } from '../constants';

export const deactmine = ({
    waxUser,
    mineId,
}: {
    waxUser: string;
    mineId?: number;
}) => ({
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
});
