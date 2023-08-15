import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useAccountName, useReloadPage } from 'shared';
import { ContractDto, signrcontr, trmrcontract } from 'entities/smartcontract';
import { useSmartContractAction } from '../../../hooks';
import { SecondPartyDepositModal } from '../ui';
import { frontStatusMap } from './getFrontStatus';

export const useButtons = (
    frontStatus: frontStatusMap | undefined,
    contract: ContractDto
) => {
    const reloadPage = useReloadPage();
    const { t } = useTranslation();
    const accountName = useAccountName();
    const singContract = useSmartContractAction({
        action: signrcontr({
            waxUser: accountName,
            contractId: Number(contract.id),
        }),
        onSignSuccess: reloadPage,
    });
    const trmContract = useSmartContractAction({
        action: trmrcontract({
            waxUser: accountName,
            contractId: Number(contract.id),
        }),
        onSignSuccess: reloadPage,
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
    const [depositModalVisibility, setDepositModalVisibility] = useState(false);
    const depositButton = (
        <>
            <Button
                onClick={() => setDepositModalVisibility(true)}
                type="primary"
            >
                {t('Deposit')}
            </Button>
            <SecondPartyDepositModal
                open={depositModalVisibility}
                contract={contract}
                onCancel={() => setDepositModalVisibility(false)}
            />
        </>
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

    if (contract.renter === accountName) {
        if (frontStatus === frontStatusMap['Signed contract']) {
            return depositButton;
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
    }
    if (contract.owner === accountName) {
        if (frontStatus === frontStatusMap['Opened Order']) {
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
        frontStatus === frontStatusMap['Opened Order'] &&
        contract.owner !== accountName &&
        !contract.renter
    ) {
        return signButton;
    }
};
