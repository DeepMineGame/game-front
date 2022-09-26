import { FC } from 'react';
import { CabinStatus } from 'entities/engineer';
import {
    Monitor,
    NoCertificate,
    AttendInauguration,
    GetTraining,
    TravelHere,
    FindWork,
    GetStatsInfo,
    UpgradeInProgress,
    UpgradeCompleted,
    Stats,
    EquipmentHallImageLink,
    EngineerMenu,
    Chair,
    StatScreen,
    WaitCitizen,
    ContractSigned,
    UnlockingSkill,
} from './ui';

const states = {
    [CabinStatus.NeedCertificate]: NoCertificate,
    [CabinStatus.NeedTravel]: TravelHere,
    [CabinStatus.NeedInauguration]: AttendInauguration,
    [CabinStatus.NeedTraining]: GetTraining,
    [CabinStatus.UnlockingSkill]: UnlockingSkill,
    [CabinStatus.NeedContract]: FindWork,
    [CabinStatus.NeedCitizen]: WaitCitizen,
    [CabinStatus.NeedUpgrade]: ContractSigned,
    [CabinStatus.UpgradeInProgress]: UpgradeInProgress,
    [CabinStatus.UpgradeCompleted]: UpgradeCompleted,
    [CabinStatus.CanSeeStats]: GetStatsInfo,
    [CabinStatus.ShowStats]: Stats,
} as const;

type Props = {
    status: CabinStatus;
    header: React.ReactNode;
};

const MainCabin: FC<Props> = ({ status, header }) => {
    const State = states[status];

    return (
        <>
            <Monitor>
                {header}
                <State />
            </Monitor>
            <EquipmentHallImageLink status={status} />
            <Chair />
            <StatScreen />
            <EngineerMenu status={status} />
        </>
    );
};

export { MainCabin };
