import { FC } from 'react';
import {
    ContractorCabinStatus,
    findEquipmentByName,
    setContractorStatusEvent,
} from 'features';
import { useEvent } from 'effector-react';
import {
    ACTION_STATE_TO_ID,
    ActionType,
    ContractDto,
    miningEquipmentNames,
    UserHistoryType,
    UserInventoryType,
} from 'entities/smartcontract';
import { SignContract } from '../SignContract';
import { NoEquipments } from '../NoEquipments';
import { NotFullEquipmentsSet } from '../NotFullEquipmentsSet';
import { Ready } from '../Ready';
import { MiningProgress } from '../MiningProgress';
import { MiningError } from '../MiningError';
import { MiningOver } from '../MiningOver';

interface ContractorCabinContentProps {
    userContracts: ContractDto[];
    userInventory: UserInventoryType[];
    userHistory: UserHistoryType[];
    hasPhysicalShift: boolean;
}

export const ContractorCabinContent: FC<ContractorCabinContentProps> = ({
    userContracts,
    userInventory,
    userHistory,
    hasPhysicalShift,
}) => {
    const setContractorStatus = useEvent(setContractorStatusEvent);
    const activeMining = userHistory.filter(
        (item) =>
            item.type === ActionType.mine &&
            item.state === ACTION_STATE_TO_ID.active
    );

    const installedItems = userInventory.filter(({ in_use }) => in_use);

    const miningEquipments = miningEquipmentNames.reduce<{
        [k: string]: UserInventoryType | undefined;
    }>((acc, name) => {
        acc[name] = findEquipmentByName(installedItems || [], name);

        return acc;
    }, {});

    const installedMiningEquipments = Object.values(miningEquipments).filter(
        (miningEquipment) => miningEquipment
    );

    const isNotFullEquipmentsSet = Object.values(miningEquipments).some(
        (miningEquipment) => !miningEquipment
    );

    const interruptedMining = userHistory.filter(
        (item) => item.state === ACTION_STATE_TO_ID.interrupted
    );

    if (userContracts.length === 0) {
        return <SignContract />;
    }

    if (!installedMiningEquipments.length) {
        return <NoEquipments hasShift={hasPhysicalShift} />;
    }

    if (isNotFullEquipmentsSet) {
        return <NotFullEquipmentsSet equipments={miningEquipments} />;
    }

    if (activeMining.length === 0) {
        return <Ready />;
    }

    if (activeMining.length !== 0) {
        setContractorStatus(ContractorCabinStatus.mining_progress);
        return (
            <MiningProgress
                finishesAt={activeMining[0].finishes_at}
                onFinish={() =>
                    setContractorStatus(ContractorCabinStatus.mining_over)
                }
            />
        );
    }

    if (interruptedMining.length !== 0) {
        return <MiningError />;
    }

    return <MiningOver />;
};
