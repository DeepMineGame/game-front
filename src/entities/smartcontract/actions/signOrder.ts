import { deepminegame } from '../constants';

export function signOrder({
    waxUser,
    contractId,
    assetId,
}: {
    waxUser: string;
    contractId: number;
    assetId: string;
}) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'signcontr',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    contract_id: contractId,
                    asset_id: assetId,
                },
            },
        ],
    };
}
