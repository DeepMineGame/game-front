import { deepminegame } from '../constants';

export const engageArea = ({
    waxUser,
    areaId,
}: {
    waxUser: string;
    areaId?: number;
}) => {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'engagearea',
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
};
