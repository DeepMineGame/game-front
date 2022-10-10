import { Dispatch, FC, SetStateAction } from 'react';
import { findEquipmentByName } from 'features';
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
import { CABIN_STATUS } from '../../constants';

interface ContractorCabinContentProps {
    userContracts: ContractDto[];
    userInventory: UserInventoryType[];
    userHistory: UserHistoryType[];
    hasPhysicalShift: boolean;
    setStatus: Dispatch<SetStateAction<number>>;
}

export const ContractorCabinContent: FC<ContractorCabinContentProps> = ({
    userContracts,
    userInventory,
    userHistory,
    hasPhysicalShift,
    setStatus,
}) => {
    const activeMining = userHistory.filter(
        (item) =>
            item.type === ActionType.mine &&
            item.state === ACTION_STATE_TO_ID.active
    );

    const installedItems = userInventory.filter(({ in_use }) => in_use);

    const miningEquipments = Object.fromEntries(
        miningEquipmentNames.map((name) => [
            name,
            findEquipmentByName(installedItems || [], name),
        ])
    );

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
        setStatus(CABIN_STATUS.sign_contract);
        return <SignContract />;
    }

    if (!installedMiningEquipments.length) {
        setStatus(CABIN_STATUS.no_equipments);
        return <NoEquipments hasShift={hasPhysicalShift} />;
    }

    if (isNotFullEquipmentsSet) {
        setStatus(CABIN_STATUS.not_full_equipments_set);
        return <NotFullEquipmentsSet equipments={miningEquipments} />;
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

    if (interruptedMining.length !== 0) {
        setStatus(CABIN_STATUS.mining_interrupted);
        return <MiningError />;
    }

    // FIXME: Bad practice. Throws error in console!
    setStatus(CABIN_STATUS.mining_over);

    return <MiningOver />;
};
