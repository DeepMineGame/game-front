import { deepminegame, deepmineming } from '../constants';

export * from './type';
export * from './calcmining';
export * from './physicalShift';
export * from './activatemine';
export * from './deactmine';
export * from './contrclaim';
export * from './moclaim';
export * from './withdrawAssets';
export * from './engageArea';
export * from './unEngageArea';
export * from './claimArea';
export * from './signOrder';
export * from './setupMine';
export * from './terminateContract';
export * from './abandonMine';
export * from './engineer';
export * from './repairEquipment';
export * from './cmdStart';
export * from './cmdFinish';
export * from './crtcontype';
export * from './disautorenew';
export * from './crtrcontract';
export function toggleMining({
    waxUser,
    contractId,
    type,
}: {
    waxUser: string;
    contractId: number;
    type: 'start' | 'stop';
}) {
    return {
        actions: [
            {
                account: deepmineming,
                name: type === 'start' ? 'startmining' : 'stopmining',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    contract_id: contractId,
                    duration: 30,
                    real_mined_amount: 100000,
                },
            },
        ],
    };
}

interface InstallEquipmentArgsType {
    waxUser: string;
    contractId: number;
    items: string[];
}
export const installEquipment = ({
    waxUser,
    contractId,
    items,
}: InstallEquipmentArgsType) => {
    return {
        actions: [
            {
                account: deepmineming,
                name: 'instequip',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    contract_id: contractId,
                    items,
                },
            },
        ],
    };
};

export const uninstallEquipment = ({
    waxUser,
    items,
}: {
    waxUser: string;
    items: string[];
}) => {
    return {
        actions: [
            {
                account: deepmineming,
                name: 'uninstequip',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
                    items,
                },
            },
        ],
    };
};

export const authorizeUser = (waxAddress: string, userId: string) => ({
    actions: [
        {
            account: deepminegame,
            name: 'authorize',
            authorization: [
                {
                    actor: waxAddress,
                    permission: 'active',
                },
            ],
            data: {
                wax_user: waxAddress,
                key: userId,
            },
        },
    ],
});
