import { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { EngineerStateBadge, MainCabin, Monitor } from 'features/engineer';
import {
    EngineerCabinGate,
    CabinStatus,
    getStatus,
    engineerCabinStore,
    isEngineerCabinLoading,
    getState,
    CabinState,
} from 'entities/engineer';
import { tablet, useMediaQuery, useUserLocation } from 'shared/lib/hooks';
import {
    EngineerRoomDark,
    EngineerRoomLight,
    EngineerRoomYellow,
    FullScreenBackground,
    Loader,
} from 'shared/ui';
import { TravelToWorkshop } from '../ui';

type Props = {
    accountName: string;
};

const roomBackgrounds = {
    [CabinState.Idle]: EngineerRoomDark,
    [CabinState.Active]: EngineerRoomLight,
    [CabinState.Work]: EngineerRoomYellow,
};

const CabinPage: FC<Props> = ({ accountName }) => {
    useGate(EngineerCabinGate, { searchParam: accountName });

    const inLocation = useUserLocation();
    const isTablet = useMediaQuery(tablet);
    const engineerStore = useStore(engineerCabinStore);
    const isLoading = useStore(isEngineerCabinLoading);
    const status = getStatus(engineerStore);
    const state = getState(status);

    const isNeedDisplayTravel =
        status === CabinStatus.NeedTravel ||
        (state !== CabinState.Idle && !inLocation.engineersWorkshop);

    if (isLoading) {
        return (
            <Monitor>
                <Loader centered />
            </Monitor>
        );
    }

    return (
        <>
            <MainCabin
                status={status}
                header={isTablet ? <EngineerStateBadge state={state} /> : null}
            />

            {isNeedDisplayTravel && <TravelToWorkshop />}
            <FullScreenBackground src={roomBackgrounds[state]} />
        </>
    );
};

export { CabinPage };
