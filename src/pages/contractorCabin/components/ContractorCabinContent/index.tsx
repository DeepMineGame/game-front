import React, { Dispatch } from 'react';

import {
    ACTION_STATE_TO_ID,
    CABIN_STATUS,
    ID_TO_INVENTORY,
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

interface ContractorCabinContentProps {
    userContracts: UserContractsType[];
    userInventory: UserInventoryType[];
    userHistory: UserHistoryType[];
    hasPhysicalShift: boolean;
    setStatus: Dispatch<React.SetStateAction<number>>;
}

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

    const inventoryCount = Object.keys(ID_TO_INVENTORY).length;
    const activeInventory = userInventory.filter((v) => v.activated);
    const visibleInventory = userInventory.filter((v) => v.is_visible);

    if (visibleInventory.length < inventoryCount) {
        setStatus(CABIN_STATUS.welcome);
        const activeInventoryIds = visibleInventory.map(
            (v) => v.asset_template_id
        );
        const equipments = Object.entries(ID_TO_INVENTORY).map(
            ([id, name]) => ({
                name,
                isAvailable: activeInventoryIds.includes(+id),
            })
        );
        return <Welcome equipments={equipments} />;
    }

    if (activeInventory.length < inventoryCount) {
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
        return <MiningProgress msUntil={activeMining[0].finishes_at * 1000} />;
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
