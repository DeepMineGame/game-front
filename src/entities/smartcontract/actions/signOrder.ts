import { deepminesmrt } from '../constants';

export function signOrder({
    waxUser,
    contractId,
    assetId,
}: {
    waxUser: string;
    contractId: number;
    assetId?: string;
}) {
    return {
        actions: [
            {
                account: deepminesmrt,
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
                    ...(assetId && { opt_asset_id: assetId }),
                    opt_level: null,
                    opt_rarity: null,
                },
            },
        ],
    };
}
