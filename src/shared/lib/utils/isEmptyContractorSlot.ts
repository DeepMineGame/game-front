import { ContractorSlot, SlotStatus } from 'entities/smartcontract';

export const isEmptyContractorSlot = (slot: ContractorSlot) => {
    return slot.reserved === SlotStatus.unreserved && slot.contractor === '';
};
