import { deepminegame } from '../constants';

export const unEngageArea = ({
    waxUser,
    areaId,
}: {
    waxUser: string;
    areaId?: number;
}) => ({
    actions: [
        {
            account: deepminegame,
            name: 'unengagearea',
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
