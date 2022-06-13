export enum LOCATION_TO_ID {
    undefined,
    mine,
    landlords_reception,
    cabinet,
    city,
    geologists_camp,
    map,
    scientists_laboratory,
    mine_deck,
    engineers_workshop,
    factory,
}

export const locationMap = {
    [LOCATION_TO_ID.undefined]: null,
    [LOCATION_TO_ID.mine]: 'mine',
    [LOCATION_TO_ID.landlords_reception]: 'land lord reception',
    [LOCATION_TO_ID.cabinet]: 'cabinet',
    [LOCATION_TO_ID.city]: 'city',
    [LOCATION_TO_ID.geologists_camp]: 'geologists camp',
    [LOCATION_TO_ID.map]: 'map',
    [LOCATION_TO_ID.scientists_laboratory]: 'scientists laboratory',
    [LOCATION_TO_ID.mine_deck]: 'mien deck',
    [LOCATION_TO_ID.engineers_workshop]: 'engineers workshop',
    [LOCATION_TO_ID.factory]: 'factory',
};
