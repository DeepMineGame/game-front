import { name } from '../..';

export function physicalShift(waxUser: string, newLocation: number) {
    return {
        actions: [
            {
                account: name,
                name: 'changelocn',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    new_location: newLocation,
                },
            },
        ],
    };
}
