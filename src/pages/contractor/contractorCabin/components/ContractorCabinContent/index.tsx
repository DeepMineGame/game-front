import React, { Dispatch } from 'react';

import {
    ACTION_STATE_TO_ID,
    ActionType,
    ContractDto,
    EquipmentType,
    ID_TO_INVENTORY,
    INVENTORY_NAMES,
    miningEquipmentNames,
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
    const names = arr
        .map((v) => ID_TO_INVENTORY[v.template_id])
        .filter(Boolean);
    return [...new Set(names)];
};

const getEquipments = (inventoryNames: string[]) => {
    return INVENTORY_NAMES.map((name) => ({
        name,
        isAvailable: inventoryNames.includes(name),
    })).filter((v) => miningEquipmentNames.includes(v.name));
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
    const equipmentInventoryNames = getInventoryNames(userInventory).filter(
        (item) => miningEquipmentNames.includes(item)
    );
    const activeInventoryNames = getInventoryNames(
        userInventory.filter((v) => v.inv_type in EquipmentType)
    );
    if (userContracts.length === 0) {
        setStatus(CABIN_STATUS.sign_contract);
        return <SignContract />;
    }

    if (equipmentInventoryNames.length < miningEquipmentNames.length) {
        setStatus(CABIN_STATUS.welcome);
        const equipments = getEquipments(equipmentInventoryNames);
        return <Welcome equipments={equipments} />;
    }

    if (activeInventoryNames.length < miningEquipmentNames.length) {
        setStatus(CABIN_STATUS.setup);
        const equipments = getEquipments(activeInventoryNames);
        return <Setup hasShift={hasPhysicalShift} equipments={equipments} />;
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
