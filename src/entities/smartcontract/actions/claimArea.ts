import { deepminegame } from '../constants';

export function claimArea({
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
    };
}
