import { deepminegame } from '../constants';

export function setuparea({
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
                name: 'setuparea',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    asset_id: areaId,
                },
            },
        ],
    };
}
