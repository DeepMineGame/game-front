import { useStore } from 'effector-react';
import { LOCATION_TO_ID, smartContractUserStore } from 'entities/smartcontract';

export const useUserLocation = () => {
    const userRow = useStore(smartContractUserStore);
    const user = userRow?.[0];

    return {
        mine: user?.location === LOCATION_TO_ID.mine,
        mineDeck: user?.location === LOCATION_TO_ID.mine_deck,
        hive: user?.location === LOCATION_TO_ID.hive,
        engineersWorkshop: user?.location === LOCATION_TO_ID.engineers_workshop,
        landlordReception:
            user?.location === LOCATION_TO_ID.landlords_reception,
    };
};
