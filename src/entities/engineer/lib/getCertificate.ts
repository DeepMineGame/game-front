import {
    ENGINEER_CERTIFICATE_ID,
    UserInventoryType,
} from 'entities/smartcontract';

export const getCertificate = (inventory: UserInventoryType[]) => {
    const certificate = inventory.find(
        (item) => item.template_id === ENGINEER_CERTIFICATE_ID
    );
    return certificate || null;
};
