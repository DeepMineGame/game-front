import {
    ContractDto,
    RentalContractStatuses,
    RentalContractSubStatus,
    ViolationDto,
} from 'entities/smartcontract';

export enum frontStatusMap {
    'Opened Order' = 'Opened Order',
    'Signed contract' = 'Signed contract',
    'Valid Contract' = 'Valid Contract',
    'Deleted' = 'Deleted',
    'Terminated, Contract terminated' = 'Terminated, Contract terminated',
    'Ended / Minimum Fee Violation' = 'Ended / Minimum Fee Violation',
    'Ended / Item Broken Violation with 72h to fix equipment' = 'Ended / Item Broken Violation with 72h to fix equipment',
    'Ended / Item Broken Violation with 72h expired' = 'Ended / Item Broken Violation with 72h expired ',
    'Ended / Ok with 72 hours to return equipment' = 'Ended / Ok with 72 hours to return equipment',
    'Ended / Ok with 72 expired' = 'Ended / Ok with 72 expired',
    'Completed' = 'Completed',
    'Ended / Minimum Fee Violation / Item Broken Violation with 72h to fix equipment' = 'Ended / Minimum Fee Violation / Item Broken Violation with 72h to fix equipment',
    'Ended / Minimum Fee Violation / Item Broken Violation with 72h expired' = 'Ended / Minimum Fee Violation / Item Broken Violation with 72h expired',
    'Ended / Minimum Fee Violation / Ok with 72 hours to return equipment' = 'Ended / Minimum Fee Violation / Ok with 72 hours to return equipment',
    'Ended / Minimum Fee Violation / Ok with 72 expired' = 'Ended / Minimum Fee Violation / Ok with 72 expired',
}

export const getFrontStatus = ({
    status,
    substatus,
    violations,
}: ContractDto) => {
    if (
        substatus === RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING &&
        violations.includes(ViolationDto.FEE_NOT_ENOUGH_PAID) &&
        violations.includes(ViolationDto.ASSET_IS_BROKEN)
    ) {
        return frontStatusMap[
            'Ended / Minimum Fee Violation / Item Broken Violation with 72h to fix equipment'
        ];
    }

    if (
        substatus ===
            RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING_EXPIRED &&
        violations.includes(ViolationDto.FEE_NOT_ENOUGH_PAID) &&
        violations.includes(ViolationDto.ASSET_IS_BROKEN)
    ) {
        return frontStatusMap[
            'Ended / Minimum Fee Violation / Item Broken Violation with 72h expired'
        ];
    }

    if (
        substatus === RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING &&
        violations.includes(ViolationDto.FEE_NOT_ENOUGH_PAID)
    ) {
        return frontStatusMap[
            'Ended / Minimum Fee Violation / Ok with 72 hours to return equipment'
        ];
    }
    if (
        substatus ===
            RentalContractSubStatus.ACTIVE_EQUIPMENT_RETURNING_EXPIRED &&
        violations.includes(ViolationDto.FEE_NOT_ENOUGH_PAID)
    ) {
        return frontStatusMap[
            'Ended / Minimum Fee Violation / Ok with 72 expired'
        ];
    }

    if (status === RentalContractStatuses.SIGNED_BY_OWNER) {
        return frontStatusMap['Opened Order'];
    }
    if (status === RentalContractStatuses.SIGNED_BY_RENTER) {
        return frontStatusMap['Signed contract'];
    }
    if (status === RentalContractStatuses.ACTIVE && !substatus) {
        return frontStatusMap['Valid Contract'];
    }
    if (substatus === RentalContractSubStatus.TERMINATED_BY_OWNER) {
        return frontStatusMap.Deleted;
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
    if (status === RentalContractStatuses.TERMINATED) {
        return frontStatusMap['Terminated, Contract terminated'];
    }
};

export const getColorForFrontStatus = (status: frontStatusMap | undefined) => {
    const neutralColor = '#FFF';
    const red = '#D32029';
    const green = '#47FF40';

    if (status === frontStatusMap['Opened Order']) {
        return neutralColor;
    }
    if (status === frontStatusMap['Valid Contract']) {
        return neutralColor;
    }
    if (status === frontStatusMap['Signed contract']) {
        return neutralColor;
    }
    if (status === frontStatusMap.Deleted) {
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
    if (
        status ===
        frontStatusMap[
            'Ended / Minimum Fee Violation / Item Broken Violation with 72h to fix equipment'
        ]
    ) {
        return red;
    }
    if (
        status ===
        frontStatusMap[
            'Ended / Minimum Fee Violation / Item Broken Violation with 72h expired'
        ]
    ) {
        return red;
    }
    if (
        status ===
        frontStatusMap[
            'Ended / Minimum Fee Violation / Ok with 72 hours to return equipment'
        ]
    ) {
        return red;
    }
    if (
        status ===
        frontStatusMap['Ended / Minimum Fee Violation / Ok with 72 expired']
    ) {
        return red;
    }
};
