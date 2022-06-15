export enum LOCATION_TO_ID {
    undefined,
    mine,
    landlords_reception,
    city,
    geologists_camp,
    hive,
    scientists_laboratory,
    mine_deck,
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
    [LOCATION_TO_ID.mine_deck]: 'Mien deck',
    [LOCATION_TO_ID.engineers_workshop]: 'Engineers workshop',
    [LOCATION_TO_ID.factory]: 'Factory',
};
