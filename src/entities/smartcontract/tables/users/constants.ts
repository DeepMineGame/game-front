export enum LOCATION_TO_ID {
    undefined,
    mine,
    landlords_reception,
    mine_deck,
    hive,
    engineers_workshop,
}

export const locationMap = {
    [LOCATION_TO_ID.undefined]: null,
    [LOCATION_TO_ID.mine]: 'Mine',
    [LOCATION_TO_ID.landlords_reception]: 'Land lord reception',
    [LOCATION_TO_ID.mine_deck]: 'Mine deck',
    [LOCATION_TO_ID.hive]: 'Hive',
    [LOCATION_TO_ID.engineers_workshop]: 'Engineers workshop',
};
