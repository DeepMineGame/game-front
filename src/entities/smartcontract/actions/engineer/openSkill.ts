import { deepmineengr } from '../../index';

export function openSkill(waxUser: string, assetId: string | number) {
    return {
        actions: [
            {
                account: deepmineengr,
                name: 'openskill',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    skill_template_id: assetId,
                },
            },
        ],
    };
}
