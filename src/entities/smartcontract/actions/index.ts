import { deepminegame } from '../constants';

export * from './type';
export * from './calcmining';
export * from './physicalShift';

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

                    mining_duration: 30,
                },
            },
        ],
    };
}

export function claimdme({ waxUser }: { waxUser: string }) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'claimdme',
                authorization: [
                    {
                        actor: waxUser,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: waxUser,
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
                name: 'instacequip',
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
                name: 'uninsacequip',
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
