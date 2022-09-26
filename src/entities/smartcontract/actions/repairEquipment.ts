import { deepminegame } from '../index';

export const repairEquipment = (
    waxUser: string,
    assetId: number,
    isMajor: boolean = false
) => ({
    actions: [
        {
            account: deepminegame,
            name: 'equiprepair',
            authorization: [
                {
                    actor: waxUser,
                    permission: 'active',
                },
            ],
            data: {
                wax_user: waxUser,
                asset_id: assetId,
                is_major: isMajor,
            },
        },
    ],
});
