import { FC } from 'react';
import { CabinStatus } from 'entities/engineer';
import {
    Monitor,
    NoCertificate,
    AttendInauguration,
    GetTraining,
    TravelHere,
    FindWork,
    BuyUpgradeKit,
    GetStatsInfo,
    UpgradeInProgress,
    UpgradeCompleted,
    Stats,
    EquipmentHallImageLink,
    EngineerMenu,
    Chair,
    StatScreen,
} from './ui';

const states = {
    [CabinStatus.NeedCertificate]: NoCertificate,
    [CabinStatus.NeedTravel]: TravelHere,
    [CabinStatus.NeedInauguration]: AttendInauguration,
    [CabinStatus.NeedTraining]: GetTraining,
    [CabinStatus.NeedWork]: FindWork,
    [CabinStatus.NeedUpgradeKit]: BuyUpgradeKit,
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
            <EquipmentHallImageLink />
            <Chair />
            <StatScreen />
            <EngineerMenu />
        </>
    );
};

export { MainCabin };
