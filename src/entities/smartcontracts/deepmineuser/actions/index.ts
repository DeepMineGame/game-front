import { name } from '../..';

export function startMining(waxUser: string, contractId: number) {
    return {
        actions: [
            {
                account: name,
                name: 'startmining',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    contract_id: contractId,
                },
            },
        ],
    };
}

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
