import { Roles } from 'entities/game-stat';

export const contractorItem = {
    label: 'Contractor',
    value: Roles.contractor,
};
export const mineOwnerItem = {
    label: 'Mine owner',
    value: Roles.mineowner,
};

export const landLordItem = {
    label: 'Landlord',
    value: Roles.landlord,
};

export const engineerItem = {
    label: 'Engineer',
    value: Roles.engineer,
};

export const availableSelectItemByRole = {
    [Roles.engineer]: [contractorItem, mineOwnerItem],
    [Roles.mineowner]: [landLordItem, contractorItem, engineerItem],
    [Roles.contractor]: [mineOwnerItem, engineerItem],
    [Roles.landlord]: [mineOwnerItem],
};
