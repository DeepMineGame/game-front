import { deepminegame } from '../index';

export function physicalShift(
    waxUser: string,
    newLocation: number,
    duration = 0
) {
    return {
        actions: [
            {
                account: deepminegame,
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
                    duration,
                },
            },
        ],
    };
}
