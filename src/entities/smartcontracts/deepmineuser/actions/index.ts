import { name } from '../..';

export function startMining(wax_user: string, contract_id: number) {
    return {
        actions: [
            {
                account: name,
                name: 'startmining',
                authorization: [
                    {
                        actor: wax_user,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user,
                    contract_id,
                },
            },
        ],
    };
}

export function physicalShift(wax_user: string, new_location: number) {
    return {
        actions: [
            {
                account: name,
                name: 'changelocn',
                authorization: [
                    {
                        actor: wax_user,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user,
                    new_location,
                },
            },
        ],
    };
}
