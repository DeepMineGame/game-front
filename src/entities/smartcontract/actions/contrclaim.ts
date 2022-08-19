import { deepminegame } from '../constants';

export const contrclaim = ({ waxUser }: { waxUser: string }) => ({
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
});
