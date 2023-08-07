import React, { FC } from 'react';
import { Button, Col, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { secondsToDays, toLocaleDate, useAccountName } from 'shared';
import { PageHeader } from '@ant-design/pro-components';
import {
    ContractDto,
    RentalContractStatuses,
    RentalContractSubStatus,
    ViolationDto,
    signrcontr,
    trmrcontract,
} from 'entities/smartcontract';
import { ContractProps } from '../../service-market/types';
import { TableWithTitle } from '../../service-market';
import { useSmartContractAction } from '../../hooks';

enum frontStatusMap {
    'Opened Order' = 'Opened Order',
    'Signed contract' = 'Signed contract',
    'Valid Contract' = 'Valid Contract',
    'Delited' = 'Delited',
    'Terminated, Contract terminated' = 'Terminated, Contract terminated',
    'Ended / Minimum Fee Violation' = 'Ended / Minimum Fee Violation',
    'Ended / Item Broken Violation with 72h to fix equipment' = 'Ended / Item Broken Violation with 72h to fix equipment',
    'Ended / Item Broken Violation with 72h expired' = 'Ended / Item Broken Violation with 72h expired ',
    'Ended / Ok with 72 hours to return equipment' = 'Ended / Ok with 72 hours to return equipment',
    'Ended / Ok with 72 expired' = 'Ended / Ok with 72 expired',
    'Completed' = 'Completed',
}
const getFrontStatus = ({ status, substatus, violations }: ContractDto) => {
    if (status === RentalContractStatuses.SIGNED_BY_OWNER) {
        return frontStatusMap['Opened Order'];
    }
    if (status === RentalContractStatuses.SIGNED_BY_RENTER) {
        return frontStatusMap['Signed contract'];
    }
    if (status === RentalContractStatuses.ACTIVE && substatus === undefined) {
        return frontStatusMap['Valid Contract'];
    }
    if (substatus === RentalContractSubStatus.TERMINATED_BY_OWNER) {
        return frontStatusMap.Delited;
    }

    if (substatus === RentalContractSubStatus.COMPLETED_BY_RENTER) {
        return frontStatusMap['Terminated, Contract terminated'];
    }
    if (
        (substatus === RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING ||
            substatus ===
                RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING_EXPIRED) &&
        violations.includes(ViolationDto.FEE_NOT_ENOUGH_PAID)
    ) {
        return frontStatusMap['Ended / Minimum Fee Violation'];
    }

    if (
        substatus === RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING &&
        violations.includes(ViolationDto.ASSET_IS_BROKEN)
    ) {
        return frontStatusMap[
            'Ended / Item Broken Violation with 72h to fix equipment'
        ];
    }
    if (
        substatus ===
            RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING_EXPIRED &&
        violations.includes(ViolationDto.ASSET_IS_BROKEN)
    ) {
        return frontStatusMap['Ended / Item Broken Violation with 72h expired'];
    }
    if (substatus === RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING) {
        return frontStatusMap['Ended / Ok with 72 hours to return equipment'];
    }
    if (
        substatus === RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING_EXPIRED
    ) {
        return frontStatusMap['Ended / Ok with 72 expired'];
    }
    if (status === RentalContractStatuses.COMPLETED) {
        return frontStatusMap.Completed;
    }
};

const getColorForFrontStatus = (status: frontStatusMap | undefined) => {
    const neutralColor = '#FFF';
    const red = '#D32029';
    const green = '#47FF40';

    if (status === frontStatusMap['Opened Order']) {
        return neutralColor;
    }
    if (status === frontStatusMap['Signed contract']) {
        return neutralColor;
    }
    if (status === frontStatusMap.Delited) {
        return red;
    }
    if (status === frontStatusMap['Terminated, Contract terminated']) {
        return red;
    }
    if (status === frontStatusMap['Ended / Minimum Fee Violation']) {
        return red;
    }
    if (
        status ===
        frontStatusMap[
            'Ended / Item Broken Violation with 72h to fix equipment'
        ]
    ) {
        return red;
    }
    if (
        status ===
        frontStatusMap['Ended / Item Broken Violation with 72h expired']
    ) {
        return red;
    }
    if (
        status ===
        frontStatusMap['Ended / Ok with 72 hours to return equipment']
    ) {
        return neutralColor;
    }
    if (status === frontStatusMap['Ended / Ok with 72 expired']) {
        return neutralColor;
    }
    if (status === frontStatusMap.Completed) {
        return green;
    }
};

const useButtons = (
    frontStatus: frontStatusMap | undefined,
    contract: ContractDto
) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const singContract = useSmartContractAction({
        action: signrcontr({
            waxUser: accountName,
            contractId: Number(contract.id),
        }),
    });
    const trmContract = useSmartContractAction({
        action: trmrcontract({
            waxUser: accountName,
            contractId: Number(contract.id),
        }),
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
    const depositButton = <Button type="primary">{t('Deposit')}</Button>;
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

    if (contract.renter === accountName) {
        if (frontStatus === frontStatusMap['Opened Order']) {
            return signButton;
        }
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
    }
    return signButton;
};

const RentalContract: FC<ContractProps> = ({ contract }) => {
    const { t } = useTranslation();
    const frontStatus = getFrontStatus(contract);
    const button = useButtons(frontStatus, contract);
    console.log(button);
    return (
        <div>
            <PageHeader
                style={{
                    marginBottom: '20px',
                    border: `1px solid ${getColorForFrontStatus(frontStatus)}`,
                }}
                ghost={false}
                extra={[button]}
                title={
                    <span
                        style={{
                            color: getColorForFrontStatus(frontStatus),
                        }}
                    >
                        {frontStatus}
                    </span>
                }
            />
            <Row gutter={[32, 32]}>
                <Col xs={24} md={12}>
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            {/* <GeneralDataTable */}
                            {/*    contract={contract} */}
                            {/*    accountName={accountName} */}
                            {/* /> */}
                            <TableWithTitle
                                title={t('General information')}
                                data={{
                                    [t('Contract ID')]: contract.id,
                                    [t('Status')]: String(
                                        contract.status
                                    ).replaceAll('_', ' '),

                                    [t('Creation date')]: toLocaleDate(
                                        contract.create_time
                                    ),
                                    [t('Duration')]: `${secondsToDays(
                                        contract.contract_duration
                                    )} ${t('Days').toLowerCase()}`,
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={12}>
                    <TableWithTitle
                        title={t('Conditions')}
                        data={{
                            [t('Rental fee')]: contract.fee_percent,
                            [t('Minimum Fee')]: contract.fee_min_amount,
                        }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <TableWithTitle
                        title={t('Owner')}
                        data={{
                            [t('Owner')]: contract.owner,
                        }}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <TableWithTitle
                        title={t('Renter')}
                        data={{
                            [t('Renter')]: contract.renter,
                        }}
                    />
                </Col>
                {/* <Col xs={24} md={12}> */}
                {/*    <Row gutter={[32, 32]}> */}
                {/*        <Col span={24}> */}
                {/*            <MineOwnerTable */}
                {/*                contract={contract} */}
                {/*                accountName={accountName} */}
                {/*            /> */}
                {/*        </Col> */}
                {/*    </Row> */}
                {/* </Col> */}
            </Row>
        </div>
    );
};
export { RentalContract };
