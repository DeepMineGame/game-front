import { deepminegame } from '../constants';

export const activatemine = ({
    waxUser,
    mineId,
    duration = 0,
}: {
    waxUser: string;
    mineId?: number;
    duration?: number;
}) => ({
    actions: [
        {
            account: deepminegame,
            name: 'activatemine',
            authorization: [
                {
                    actor: waxUser,
                    permission: 'active',
                },
            ],
            data: {
                wax_user: waxUser,
                mine_id: mineId,
                duration,
            },
        },
    ],
});
