import React, { Dispatch } from 'react';

import {
    ACTION_STATE_TO_ID,
    ActionType,
    ContractDto,
    ID_TO_INVENTORY,
    INVENTORY_NAMES,
    UserHistoryType,
    UserInventoryType,
} from 'entities/smartcontract';
import { SignContract } from '../SignContract';
import { Setup } from '../Setup';
import { Welcome } from '../Welcome';
import { Ready } from '../Ready';
import { MiningProgress } from '../MiningProgress';
import { MiningError } from '../MiningError';
import { MiningOver } from '../MiningOver';
import { CABIN_STATUS } from '../../constants';

interface ContractorCabinContentProps {
    userContracts: ContractDto[];
    userInventory: UserInventoryType[];
    userHistory: UserHistoryType[];
    hasPhysicalShift: boolean;
    setStatus: Dispatch<React.SetStateAction<number>>;
}

const getInventoryNames = (arr: UserInventoryType[]) => {
    const names = arr.map((v) => ID_TO_INVENTORY[v.template_id]);
    return [...new Set(names)];
};

export const ContractorCabinContent = ({
    userContracts,
    userInventory,
    userHistory,
    hasPhysicalShift,
    setStatus,
}: ContractorCabinContentProps) => {
    const activeMining = userHistory.filter(
        (item) =>
            item.type === ActionType.mine &&
            item.state === ACTION_STATE_TO_ID.active
    );
    const inventoryNames = getInventoryNames(userInventory);
    const activeInventoryNames = getInventoryNames(
        userInventory.filter((v) => v.in_use)
    );

    if (userContracts.length === 0) {
        setStatus(CABIN_STATUS.sign_contract);
        return <SignContract />;
    }

    if (inventoryNames.length < INVENTORY_NAMES.length) {
        setStatus(CABIN_STATUS.welcome);
        const equipments = INVENTORY_NAMES.map((name) => ({
            name,
            isAvailable: inventoryNames.includes(name),
        })).filter((v) => v.name);
        return <Welcome equipments={equipments} />;
    }

    if (activeInventoryNames.length < INVENTORY_NAMES.length) {
        setStatus(CABIN_STATUS.setup);
        return <Setup hasShift={hasPhysicalShift} />;
    }

    if (activeMining.length === 0) {
        setStatus(CABIN_STATUS.ready);
        return <Ready />;
    }

    if (activeMining.length !== 0) {
        setStatus(CABIN_STATUS.mining_progress);
        return (
            <MiningProgress
                finishesAt={activeMining[0].finishes_at}
                onFinish={() => setStatus(CABIN_STATUS.mining_over)}
            />
        );
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
