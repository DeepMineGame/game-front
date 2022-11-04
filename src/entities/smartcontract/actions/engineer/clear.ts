import { deepmineengr } from '../../index';

export function clearEngineer(waxUser: string, certificateId: string) {
    return {
        actions: [
            {
                account: deepmineengr,
                name: 'cleareng',
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
