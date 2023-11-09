import { deepminegame } from '../../smartcontract';

export const atomicTransfer = ({
    accountName,
    ids,
    to = deepminegame,
}: {
    accountName: string;
    ids: number[];
    to?: string;
}) => ({
    actions: [
        {
            account: 'atomicassets',
            name: 'transfer',
            authorization: [
                {
                    actor: accountName,
                    permission: 'active',
                },
            ],
            data: {
                from: accountName,
                to,
                asset_ids: ids,
                memo: '',
            },
        },
    ],
});
