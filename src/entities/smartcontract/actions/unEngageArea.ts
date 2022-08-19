import { deepminegame } from '../constants';

export function unEngageArea({
    waxUser,
    areaId,
}: {
    waxUser: string;
    areaId?: number;
}) {
    return {
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
    };
}
