import { useAccountName } from 'shared';
import {
    ContractDto,
    ContractStatus,
    OrderState,
    OrderSubState,
} from 'entities/smartcontract';
import {
    CompletedButton,
    DeleteOrder,
    SignContractorOrder,
    SignMineOwnerContractorOrder,
    TerminateContract,
} from '../ui/actions';

export const useContractButtons = (contract: ContractDto) => {
    const accountName = useAccountName();
    const isSelfSignedContract = contract.executor === contract.client;

    const terminateButton = (
        <TerminateContract contractId={contract.id} accountName={accountName} />
    );
    const completeButton = (
        <CompletedButton contractId={contract.id} accountName={accountName} />
    );
    const deleteButton = (
        <DeleteOrder accountName={accountName} contractId={contract.id} />
    );
    const isUserInvolved =
        contract.client === accountName || contract.executor === accountName;

    const isSignByClient = contract.status === ContractStatus.signed_by_client;
    const isSignByExecutor =
        contract.status === ContractStatus.signed_by_executor;
    let buttons;

    if (OrderState.OpenOrder === contract.computed?.status) {
        if (isUserInvolved) {
            if (isSignByClient) {
                if (contract.client === accountName) {
                    buttons = deleteButton;
                }
                if (contract.client !== accountName) {
                    buttons = (
                        <SignContractorOrder
                            contract={contract}
                            accountName={accountName}
                        />
                    );
                }
            }
            if (isSignByExecutor) {
                if (contract.executor === accountName) {
                    buttons = deleteButton;
                }
                if (contract.executor !== accountName) {
                    buttons = (
                        <SignMineOwnerContractorOrder
                            contract={contract}
                            accountName={accountName}
                            isSelfContract={false}
                        />
                    );
                }
            }
            if (isSelfSignedContract) {
                if (isSignByClient) {
                    buttons = [
                        <SignMineOwnerContractorOrder
                            contract={contract}
                            accountName={accountName}
                            isSelfContract
                        />,
                        deleteButton,
                    ];
                }
                if (isSignByExecutor) {
                    buttons = [
                        <SignContractorOrder
                            contract={contract}
                            accountName={accountName}
                            isClient={1}
                        />,
                        deleteButton,
                    ];
                }
            }
        }

        if (!isUserInvolved) {
            if (isSignByClient) {
                buttons = (
                    <SignMineOwnerContractorOrder
                        contract={contract}
                        accountName={accountName}
                        isSelfContract={false}
                    />
                );
            }
            if (isSignByExecutor) {
                buttons = (
                    <SignContractorOrder
                        contract={contract}
                        accountName={accountName}
                    />
                );
            }
        }
    }
    if (OrderState.ValidContract === contract.computed?.status) {
        if (isUserInvolved) {
            buttons = terminateButton;
        }
    }
    if (OrderState.WaitingForAction === contract.computed?.status) {
        if (isUserInvolved) {
            if (OrderSubState.undefined === contract.computed?.sub_status) {
                buttons = completeButton;
            }
            if (
                OrderSubState.PrematureTerminated ===
                contract.computed?.sub_status
            ) {
                buttons = terminateButton;
            }
            if (isSelfSignedContract) {
                if (OrderSubState.undefined === contract.computed?.sub_status) {
                    buttons = completeButton;
                }
                if (OrderSubState.Completed === contract.computed?.sub_status) {
                    buttons = completeButton;
                }
                if (OrderSubState.Active === contract.computed?.sub_status) {
                    buttons = terminateButton;
                }
                if (
                    OrderSubState.PrematureTerminated ===
                    contract.computed?.sub_status
                ) {
                    buttons = deleteButton;
                }
            }
        }
    }
    return buttons;
};