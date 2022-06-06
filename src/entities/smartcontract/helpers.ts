type TransactionData = {
    contractName: string;
    contractAction: string;
    accountName: string;
    data: any;
};

export const createSignTransactionData = ({
    contractName,
    contractAction,
    accountName,
    data,
}: TransactionData) => ({
    actions: [
        {
            account: contractName,
            name: contractAction,
            authorization: [
                {
                    actor: accountName,
                    permission: 'active',
                },
            ],
            data,
        },
    ],
});
