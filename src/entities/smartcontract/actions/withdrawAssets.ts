import { deepminegame } from '../index';

export function withdrawAssets(waxUser: string, ids: string[]) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'withdrawasst',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    asset_ids: ids,
                },
            },
        ],
    };
}
