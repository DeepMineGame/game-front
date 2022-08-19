import { deepminegame } from '../index';

export const withdrawAssets = (waxUser: string, ids: string[]) => ({
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
});
