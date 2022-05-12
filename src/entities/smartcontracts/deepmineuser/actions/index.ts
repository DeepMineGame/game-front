import { name } from '../..';
import { Action } from './type';

export function startMining(
    wax_user: string,
    contract_id: number
): {
    actions: Action<{ wax_user: string; contract_id: number }>;
} {
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
