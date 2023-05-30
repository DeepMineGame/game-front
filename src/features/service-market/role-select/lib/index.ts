import { Roles } from 'entities/game-stat';

const contractorItem = {
    label: Roles.contractor,
    value: Roles.contractor,
};
const mineOwnerItem = {
    label: Roles.mineowner,
    value: Roles.mineowner,
};

const landLordItem = {
    label: Roles.landlord,
    value: Roles.landlord,
};

const engineerItem = {
    label: Roles.engineer,
    value: Roles.engineer,
};

export const availableSelectItemByRole = {
    [Roles.engineer]: [contractorItem, mineOwnerItem],
    [Roles.mineowner]: [landLordItem, contractorItem, engineerItem],
    [Roles.contractor]: [mineOwnerItem, engineerItem],
    [Roles.landlord]: [mineOwnerItem],
};
