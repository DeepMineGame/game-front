import { deepminegame } from '../../index';

export function openSkill(waxUser: string, assetId: string) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'openskill',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    template_id: assetId,
                },
            },
        ],
    };
}