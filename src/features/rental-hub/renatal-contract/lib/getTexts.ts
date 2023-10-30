import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';
import { frontStatusMap } from './getFrontStatus';

export const useRentalTexts = (
    contract: ContractDto,
    accountName: string,
    status?: frontStatusMap
) => {
    const { t } = useTranslation();

    if (frontStatusMap['Ended / Item was Buyout ']) {
        if (contract.renter === accountName) {
            return t(
                "You've made a deposit and initiated equipment buyout. Complete the contract to acquire the equipment"
            );
        }
        if (contract.owner === accountName) {
            return t(
                'Your equipment was buyouted by renter. You can complete the contract'
            );
        }
    }

    if (frontStatusMap['Signed contract'] === status) {
        if (contract.renter === accountName) {
            return t(
                'Renter signed your contract. Until the deposit is paid, the contract is considered inactive and can be deleted by both the renter and the owner'
            );
        }
        if (contract.owner === accountName) {
            return t(
                'You have signed a contract for equipment rental. The contract will be activated and you will receive the equipment after you pay the security deposit. Until the deposit is paid, the contract is considered inactive and can be deleted by both the renter and the owner'
            );
        }
    }

    if (frontStatusMap.Deleted === status) {
        return t('The contract was deleted by the owner');
    }

    if (frontStatusMap['Terminated, Contract terminated'] === status) {
        if (contract.owner === accountName) {
            return t(
                'The contract was terminated by the renter. Your equipment has been returned and a contract termination fee has been paid'
            );
        }
        if (contract.renter === accountName) {
            return t('The contract was terminated by the renter');
        }
    }
    if (
        frontStatusMap[
            'Ended / Minimum Fee Violation / Item Broken Violation with 72h to fix equipment'
        ] === status
    ) {
        if (contract.owner === accountName) {
            return t(
                `The contract has expired. The terms of the contract were violated by the renter, the owner will receive compensation. Equipment must be returned within 72 hours`
            );
        }
        if (contract.owner === accountName) {
            return t(
                `The contract has expired. The terms of the contract were violated, the owner will receive compensation. The equipment is damaged. You have 72 hours to fix the equipment and to return it to its owner. Otherwise, the fine will be deducted from your insurance.`
            );
        }
    }
    if (
        frontStatusMap[
            'Ended / Minimum Fee Violation / Item Broken Violation with 72h expired'
        ] === status
    ) {
        if (contract.owner === accountName) {
            return t(
                `The contract has expired. The terms of the contract were violated by the renter, the owner will receive compensation. The equipment is damaged and Renter did not return the equipment in 72 hours. You can collect your equipment forcibly and receive insurance compensation`
            );
        }
        if (contract.renter === accountName) {
            return t(
                `The contract has expired. The terms of the contract were violated, the owner will receive compensation. The equipment is damaged. 72 hours to return the equipment has expired. You can still repair the equipment and return it without penalty. If the owner does this before you, you will pay a fine from the security deposit.`
            );
        }
    }
    if (
        frontStatusMap[
            'Ended / Minimum Fee Violation / Ok with 72 hours to return equipment'
        ] === status
    ) {
        if (contract.owner === accountName) {
            return t(
                `The contract has expired. The terms of the contract were violated by the renter, the owner will receive compensation. Equipment must be returned within 72 hours`
            );
        }
        if (contract.renter === accountName) {
            return t(
                `The contract has expired. The terms of the contract were violated, the owner will receive compensation. You have 72 hours to return it to its owner. Otherwise, the fine will be deducted from your insurance.`
            );
        }
    }
    if (
        frontStatusMap['Ended / Minimum Fee Violation / Ok with 72 expired'] ===
        status
    ) {
        if (contract.owner === accountName) {
            return t(
                `The contract has expired. The terms of the contract were violated by the renter, the owner will receive compensation. The Renter did not return the equipment in 72 hours. You can collect your equipment forcibly and receive insurance compensation`
            );
        }
        if (contract.renter === accountName) {
            return t(
                `The contract has expired. The terms of the contract were violated, the owner will receive compensation. 72 hours to return the equipment has expired. You can still return equipment without penalty. If the owner does this before you, you will pay a fine from the security deposit.`
            );
        }
    }
    if (
        frontStatusMap[
            'Ended / Item Broken Violation with 72h to fix equipment'
        ] === status
    ) {
        if (contract.owner === accountName) {
            return t(
                'The contract has expired. Equipment must be returned within 72 hours'
            );
        }
        if (contract.renter === accountName) {
            return t(
                'The contract has expired. The equipment is damaged. You have 72 hours to fix the equipment and to return it to its owner. Otherwise, the fine will be deducted from your insurance'
            );
        }
    }

    if (
        frontStatusMap['Ended / Item Broken Violation with 72h expired'] ===
        status
    ) {
        if (contract.owner === accountName) {
            return t(
                `The contract has expired. The equipment is damaged and Renter did not return the equipment in 72 hours. You can collect your equipment forcibly and receive insurance compensation`
            );
        }
        if (contract.renter === accountName) {
            return t(
                'The contract has expired. The equipment is damaged. 72 hours to return the equipment has expired. You can still repair the equipment and return it without penalty. If the owner does this before you, you will pay a fine from the security deposit.'
            );
        }
    }
    if (
        frontStatusMap['Ended / Ok with 72 hours to return equipment'] ===
        status
    ) {
        if (contract.owner === accountName) {
            return t(
                'The contract has expired. Equipment must be returned within 72 hours'
            );
        }
        if (contract.renter === accountName) {
            return t(
                'The contract has expired. You have 72 hours to return it to its owner. Otherwise, the fine will be deducted from your insurance'
            );
        }
    }
    if (frontStatusMap['Ended / Ok with 72 expired'] === status) {
        if (contract.owner) {
            return t(
                'The contract has expired. The Renter did not return the equipment in 72 hours. You can collect your equipment forcibly and receive insurance compensation'
            );
        }
        if (contract.renter) {
            return t(
                'The contract has expired. 72 hours to return the equipment has expired. You can still return equipment without penalty. If the owner does this before you, you will pay a fine from the security deposit'
            );
        }
    }
};
