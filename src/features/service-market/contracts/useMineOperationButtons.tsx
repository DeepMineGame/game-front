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
    SignAsLandlord,
    SignAsMineOwner,
    TerminateContract,
} from '../ui/actions';

export const useMineOperationButtons = (contract: ContractDto) => {
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
                        <SignAsMineOwner
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
                        <SignAsLandlord
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
                        <SignAsMineOwner
                            contract={contract}
                            accountName={accountName}
                            isClient={1}
                        />,
                        deleteButton,
                    ];
                }
                if (isSignByExecutor) {
                    buttons = [
                        <SignAsLandlord
                            contract={contract}
                            accountName={accountName}
                            isSelfContract
                        />,
                        deleteButton,
                    ];
                }
            }
        }

        if (!isUserInvolved) {
            if (isSignByClient) {
                buttons = (
                    <SignAsMineOwner
                        contract={contract}
                        accountName={accountName}
                    />
                );
            }
            if (isSignByExecutor) {
                buttons = (
                    <SignAsLandlord
                        contract={contract}
                        accountName={accountName}
                        isSelfContract={false}
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
            if (OrderSubState.Completed === contract.computed?.sub_status) {
                buttons = completeButton;
            }
            if (OrderSubState.ViolateTerms === contract.computed?.sub_status) {
                buttons = completeButton;
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
