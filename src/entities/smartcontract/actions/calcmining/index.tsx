import { deepminegame } from '../../constants';

export const calcmining = ({ waxUser }: { waxUser: string }) => ({
    actions: [
        {
            account: deepminegame,
            name: 'calcmining',
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
