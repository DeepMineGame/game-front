import React, { Dispatch } from 'react';

import {
    ACTION_STATE_TO_ID,
    ID_TO_INVENTORY,
    INVENTORY_NAMES,
    UserContractsType,
    UserHistoryType,
    UserInventoryType,
} from 'entities/smartcontracts';
import { SignContract } from '../SignContract';
import { Setup } from '../Setup';
import { Welcome } from '../Welcome';
import { Ready } from '../Ready';
import { MiningProgress } from '../MiningProgress';
import { MiningError } from '../MiningError';
import { MiningOver } from '../MiningOver';
import { CABIN_STATUS } from '../../../constants';

interface ContractorCabinContentProps {
    userContracts: UserContractsType[];
    userInventory: UserInventoryType[];
    userHistory: UserHistoryType[];
    hasPhysicalShift: boolean;
    setStatus: Dispatch<React.SetStateAction<number>>;
}

const getInventoryNames = (arr: UserInventoryType[]) => {
    const names = arr.map((v) => ID_TO_INVENTORY[+v.asset_template_id]);
    return [...new Set(names)];
};

export const ContractorCabinContent = ({
    userContracts,
    userInventory,
    userHistory,
    hasPhysicalShift,
    setStatus,
}: ContractorCabinContentProps) => {
    if (userContracts.length === 0) {
        setStatus(CABIN_STATUS.sign_contract);
        return <SignContract />;
    }

    const inventoryNames = getInventoryNames(userInventory);
    const activeInventoryNames = getInventoryNames(
        userInventory.filter((v) => v.activated)
    );

    if (inventoryNames.length < INVENTORY_NAMES.length) {
        setStatus(CABIN_STATUS.welcome);
        const equipments = INVENTORY_NAMES.map((name) => ({
            name,
            isAvailable: inventoryNames.includes(name),
        }));
        return <Welcome equipments={equipments} />;
    }

    if (activeInventoryNames.length < INVENTORY_NAMES.length) {
        setStatus(CABIN_STATUS.setup);
        return <Setup hasShift={hasPhysicalShift} />;
    }

    if (userHistory.length === 0) {
        setStatus(CABIN_STATUS.ready);
        return <Ready />;
    }

    const activeMining = userHistory.filter(
        (item) => item.state === ACTION_STATE_TO_ID.active
    );
    if (activeMining.length !== 0) {
        setStatus(CABIN_STATUS.mining_progress);
        return <MiningProgress msUntil={activeMining[0].finishes_at} />;
    }

    const interruptedMining = userHistory.filter(
        (item) => item.state === ACTION_STATE_TO_ID.interrupted
    );
    if (interruptedMining.length !== 0) {
        setStatus(CABIN_STATUS.mining_interrupted);
        return <MiningError />;
    }

    setStatus(CABIN_STATUS.mining_over);
    return <MiningOver />;
};
