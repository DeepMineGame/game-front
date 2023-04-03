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
                    opt_asset_id1: assetId || null,
                    opt_asset_id2: null,
                    opt_asset_id3: null,
                    opt_asset_id4: null,
                    opt_asset_id5: null,
                    opt_level: level ?? null,
                    opt_rarity: rarity ?? null,
                    opt_as_client: isClient ?? null,
                },
            },
        ],
    };
}
