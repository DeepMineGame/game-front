import { deepminegame } from '../constants';

export const claimArea = ({
    waxUser,
    areaId,
}: {
    waxUser: string;
    areaId?: number;
}) => ({
    actions: [
        {
            account: deepminegame,
            name: 'llclaim',
            authorization: [
                {
                    actor: waxUser,
                    permission: 'active',
                },
            ],
            data: {
                wax_user: waxUser,
                area_id: areaId,
            },
        },
    ],
});
