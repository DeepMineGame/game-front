import { deepminegame } from '../index';

export const terminateContract = (
    waxUser: string,
    contractId: number,
    demandPenalty: 0 | 1
) => ({
    actions: [
        {
            account: deepminegame,
            name: 'termcontract',
            authorization: [
                {
                    actor: waxUser,
                    permission: 'active',
                },
            ],
            data: {
                wax_user: waxUser,
                contract_id: contractId,
                demand_penalty: demandPenalty,
            },
        },
    ],
});
