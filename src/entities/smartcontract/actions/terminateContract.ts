import { deepminesmrt } from '../index';

export function terminateContract(
    waxUser: string,
    contractId: number,
    demandPenalty: 0 | 1
) {
    return {
        actions: [
            {
                account: deepminesmrt,
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
    };
}
