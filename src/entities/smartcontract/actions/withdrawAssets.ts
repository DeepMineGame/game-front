import { deepminegame } from '../index';

export function withdrawAssets(
    waxUser: string,
    ids: number[],
    account = deepminegame
) {
    return {
        actions: [
            {
                account,
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
