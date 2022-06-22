import { deepminegame } from '../../smartcontract';

export const atomicTransfer = ({
    accountName,
    ids,
}: {
    accountName: string;
    ids: string[];
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
                to: deepminegame,
                asset_ids: ids,
                memo: '',
            },
        },
    ],
});
