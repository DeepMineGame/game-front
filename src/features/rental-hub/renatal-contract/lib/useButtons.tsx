import { useTranslation } from 'react-i18next';
import { App, Button, Tooltip } from 'antd';
import React from 'react';
import { useAccountName } from 'shared';
import {
    ContractDto,
    RentalContractStatuses,
    signrcontr,
    trmrcontract,
} from 'entities/smartcontract';
import { useSmartContractAction } from '../../../hooks';
import { DepositButton } from '../ui';
import {
    DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME,
    setSomethingCountDownEvent,
} from '../../../something-in-progess-modal';
import { frontStatusMap } from './getFrontStatus';

export const useButtons = (
    frontStatus: frontStatusMap | undefined,
    contract: ContractDto
) => {
    const { modal } = App.useApp();

    const { t } = useTranslation();
    const accountName = useAccountName();
    const singContract = useSmartContractAction({
        action: signrcontr({
            waxUser: accountName,
            contractId: Number(contract.id),
        }),
        onSignSuccess: () =>
            modal.success({
                title: t('pages.serviceMarket.order.signOrder'),
                content: t('pages.serviceMarket.order.orderCreated'),
                onOk: () =>
                    setSomethingCountDownEvent(
                        DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME
                    ),
            }),
    });
    const trmContract = useSmartContractAction({
        action: trmrcontract({
            waxUser: accountName,
            contractId: Number(contract.id),
        }),
        onSignSuccess: () =>
            setSomethingCountDownEvent(DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME),
    });

    const signButton = (
        <Button type="primary" onClick={singContract}>
            {t('Sign')}
        </Button>
    );
    const deleteButton = (
        <Button onClick={trmContract} type="primary">
            {t('Delete')}
        </Button>
    );
    const completeButton = (
        <Button onClick={trmContract} type="primary">
            {t('Complete')}
        </Button>
    );

    const terminate = (
        <Button onClick={trmContract} type="primary">
            {t('Terminate')}
        </Button>
    );
    const returnEquipment = (
        <Button type="primary" onClick={trmContract}>
            {t('Return equipment')}
        </Button>
    );
    const disabledReturnButton = (
        <Tooltip
            placement="topLeft"
            title={t('You need to fix the equipment first')}
        >
            <Button disabled>{t('Return equipment')}</Button>
        </Tooltip>
    );
    const disabledComplete = (
        <Tooltip
            placement="topLeft"
            title={t('You need to fix the equipment first')}
        >
            <Button disabled>{t('Complete')}</Button>
        </Tooltip>
    );

    if (frontStatus === frontStatusMap['Ended / Item was Buyout ']) {
        return completeButton;
    }

    if (contract.renter === accountName) {
        if (frontStatus === frontStatusMap['Signed contract']) {
            return <DepositButton contract={contract} />;
        }
        if (frontStatus === frontStatusMap['Valid Contract']) {
            return terminate;
        }
        if (frontStatus === frontStatusMap['Ended / Minimum Fee Violation']) {
            return returnEquipment;
        }

        if (
            frontStatus ===
            frontStatusMap[
                'Ended / Item Broken Violation with 72h to fix equipment'
            ]
        ) {
            return disabledReturnButton;
        }

        if (
            frontStatus ===
            frontStatusMap['Ended / Item Broken Violation with 72h expired']
        ) {
            return disabledReturnButton;
        }
        if (frontStatus === frontStatusMap['Ended / Ok with 72 expired']) {
            return returnEquipment;
        }
        if (
            frontStatus ===
            frontStatusMap[
                'Ended / Minimum Fee Violation / Item Broken Violation with 72h to fix equipment'
            ]
        ) {
            return disabledComplete;
        }
        if (
            frontStatus ===
            frontStatusMap[
                'Ended / Minimum Fee Violation / Item Broken Violation with 72h expired'
            ]
        ) {
            return disabledComplete;
        }
        if (
            frontStatus ===
            frontStatusMap[
                'Ended / Minimum Fee Violation / Ok with 72 hours to return equipment'
            ]
        ) {
            return completeButton;
        }
        if (
            frontStatus ===
            frontStatusMap['Ended / Ok with 72 hours to return equipment']
        ) {
            return completeButton;
        }
    }
    if (contract.owner === accountName) {
        if (frontStatus === frontStatusMap['Open Order']) {
            return deleteButton;
        }
        if (frontStatus === frontStatusMap['Signed contract']) {
            return deleteButton;
        }
        if (
            frontStatus ===
            frontStatusMap['Ended / Item Broken Violation with 72h expired']
        ) {
            return returnEquipment;
        }
        if (frontStatus === frontStatusMap['Ended / Ok with 72 expired']) {
            return returnEquipment;
        }
        if (
            frontStatus ===
            frontStatusMap[
                'Ended / Minimum Fee Violation / Item Broken Violation with 72h expired'
            ]
        ) {
            return completeButton;
        }
    }
    if (
        frontStatus ===
        frontStatusMap['Ended / Minimum Fee Violation / Ok with 72 expired']
    ) {
        return completeButton;
    }

    if (
        frontStatus === frontStatusMap['Open Order'] &&
        contract.owner !== accountName &&
        !contract.renter
    ) {
        return signButton;
    }
    if (
        frontStatus === frontStatusMap['Open Order'] &&
        contract.renter === accountName &&
        contract.status === RentalContractStatuses.SIGNED_BY_OWNER
    ) {
        return signButton;
    }
};
