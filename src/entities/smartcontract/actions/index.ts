import { deepminegame } from '../constants';

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
                account: deepminegame,
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
                account: deepminegame,
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
    contractId,
    items,
}: InstallEquipmentArgsType) => {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'uninstequip',
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
