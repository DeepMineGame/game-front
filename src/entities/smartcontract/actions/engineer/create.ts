import { deepminegame } from '../../index';

export function createEngineer(waxUser: string, certificateId: string) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'createeng',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    asset_id: certificateId,
                },
            },
        ],
    };
}
