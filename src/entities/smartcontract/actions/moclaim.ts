import { deepminegame } from '../constants';

export const moclaim = ({ waxUser }: { waxUser: string }) => ({
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
});
