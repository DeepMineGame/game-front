import { FC } from 'react';
import {
    desktopS,
    Header,
    Monitor,
    useAccountName,
    useDimensions,
    useMediaQuery,
    useReloadPage,
} from 'shared';
import { useNavigate } from 'react-router-dom';
import * as PATHS from 'app/router/paths';
import cn from 'classnames';
import {
    $contractorCabinStore,
    $inLocation,
    ContractorCabinGate,
    ContractorCabinStatus,
    ContractorMenu,
    ContractorMenuItems,
    getStatus,
    CallToTravelNotification,
} from 'features';
import { useGate, useStore } from 'effector-react';
import { InUseType, LOCATION_TO_ID } from 'entities/smartcontract';
import styles from './styles.module.scss';
import { SignContract } from './components/SignContract';
import { NoEquipments } from './components/NoEquipments';
import { NotFullEquipmentsSet } from './components/NotFullEquipmentsSet';
import { Ready } from './components/Ready';
import { MiningProgress } from './components/MiningProgress';
import { MiningError } from './components/MiningError';
import { MiningOver } from './components/MiningOver';

const states = {
    [ContractorCabinStatus.sign_contract]: SignContract,
    [ContractorCabinStatus.no_equipments]: NoEquipments,
    [ContractorCabinStatus.not_full_equipments_set]: NotFullEquipmentsSet,
    [ContractorCabinStatus.ready]: Ready,
    [ContractorCabinStatus.mining_progress]: MiningProgress,
    [ContractorCabinStatus.mining_interrupted]: MiningError,
    [ContractorCabinStatus.mining_over]: MiningOver,
};

export const ContractorCabin: FC = () => {
    const accountName = useAccountName();
    useGate(ContractorCabinGate, { searchParam: accountName });
    const reloadPage = useReloadPage();
    const { width, height } = useDimensions();
    const isDesktop = useMediaQuery(desktopS);
    const contractorCabinStore = useStore($contractorCabinStore);
    const status = getStatus(contractorCabinStore);
    const navigate = useNavigate();
    const bgRatio = 1366 / 712;
    const isBgWidthHidden = width > height * bgRatio;
    const inLocation = useStore($inLocation);
    const hasInstalledEquipment = Object.values(
        contractorCabinStore.installedMiningEquipments
    )?.some((item) => item?.in_use === InUseType.inUse);

    const State = states[status];

    const getActiveTooltip = () => {
        if (status === ContractorCabinStatus.no_equipments && inLocation) {
            return ContractorMenuItems.Equipment;
        }

        if (status === ContractorCabinStatus.ready) {
            return ContractorMenuItems.MiningDeck;
        }

        return undefined;
    };

    return (
        <div
            className={cn(styles.cabinBackground, {
                [styles.cabinBackgroundLightRed]:
                    status === ContractorCabinStatus.mining_interrupted,
                [styles.cabinBackgroundLightGreen]:
                    status > ContractorCabinStatus.mining_over ||
                    status === ContractorCabinStatus.ready ||
                    status === ContractorCabinStatus.no_equipments,
                [styles.cabinBackgroundLightYellow]:
                    status === ContractorCabinStatus.mining_over ||
                    status === ContractorCabinStatus.mining_progress,
            })}
        >
            <Monitor
                classNameContainer={
                    isBgWidthHidden && isDesktop
                        ? styles.cabinMonitorContainerWidth
                        : styles.cabinMonitorContainerHeight
                }
            >
                <State />
            </Monitor>
            <Header withBackButton />
            <ContractorMenu
                config={{
                    disabledItems: {
                        [ContractorMenuItems.InfoPanel]:
                            status <= ContractorCabinStatus.mining_over,
                        [ContractorMenuItems.MiningDeck]:
                            status < ContractorCabinStatus.ready,
                        [ContractorMenuItems.Equipment]:
                            !hasInstalledEquipment && !inLocation,
                    },
                    callbacks: {
                        [ContractorMenuItems.InfoPanel]: () =>
                            navigate(PATHS.contractorStatsAndInfo),
                        [ContractorMenuItems.MiningDeck]: () =>
                            navigate(PATHS.mining),
                        [ContractorMenuItems.Equipment]: () =>
                            navigate(PATHS.equipmentSet),
                    },
                    activeTooltip: getActiveTooltip(),
                }}
            />
            {!inLocation && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.mine}
                    onSuccess={reloadPage}
                />
            )}
        </div>
    );
};
