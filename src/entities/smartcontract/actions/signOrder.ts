import { deepminesmrt } from '../constants';

export function signOrder({
    waxUser,
    contractId,
    assetId,
    level,
    rarity,
    isClient,
}: {
    waxUser: string;
    contractId: number;
    assetId?: string;
    level?: number;
    rarity?: number;
    isClient?: number;
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
                    opt_level: level ?? null,
                    opt_rarity: rarity ?? null,
                    opt_as_client: isClient ?? null,
                },
            },
        ],
    };
}
