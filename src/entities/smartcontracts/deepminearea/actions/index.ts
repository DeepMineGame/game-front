import { deepminearea } from '../constants';

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

export * from './type';
export * from './calcmining';
