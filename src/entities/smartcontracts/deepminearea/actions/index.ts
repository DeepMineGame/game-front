import { deepminearea } from '../constants';

export * from './type';
export * from './calcmining';

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
                account: deepminearea,
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
                },
            },
        ],
    };
}

export function claimdme({ waxUser }: { waxUser: string }) {
    return {
        actions: [
            {
                account: deepminearea,
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
                account: deepminearea,
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
                account: deepminearea,
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
