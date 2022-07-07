export enum LOCATION_TO_ID {
    undefined,
    mine,
    landlords_reception,
    mine_deck,
    city,
    hive,
    geologists_camp,
    scientists_laboratory,
    engineers_workshop,
    factory,
}

export const locationMap = {
    [LOCATION_TO_ID.undefined]: null,
    [LOCATION_TO_ID.mine]: 'Mine',
    [LOCATION_TO_ID.landlords_reception]: 'Land lord reception',
    [LOCATION_TO_ID.city]: 'City',
    [LOCATION_TO_ID.geologists_camp]: 'Geologists camp',
    [LOCATION_TO_ID.hive]: 'Hive',
    [LOCATION_TO_ID.scientists_laboratory]: 'Scientists laboratory',
    [LOCATION_TO_ID.mine_deck]: 'Mine deck',
    [LOCATION_TO_ID.engineers_workshop]: 'Engineers workshop',
    [LOCATION_TO_ID.factory]: 'Factory',
};
