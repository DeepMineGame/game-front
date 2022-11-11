import { deepmineengr } from '../../index';

export function openSkill(waxUser: string, templateId: string | number) {
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
                    skill_template_id: templateId,
                },
            },
        ],
    };
}
