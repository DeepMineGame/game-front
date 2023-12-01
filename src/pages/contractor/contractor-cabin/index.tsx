import { FC } from 'react';
import {
    desktopS,
    Header,
    Loader,
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
    $contractorCabin,
    $inLocation,
    ContractorCabinGate,
    ContractorCabinStatus,
    ContractorMenu,
    ContractorMenuItems,
    getStatus,
    CallToTravelNotification,
    $isContractorCabinLoading,
    $hasInstalledEquipment,
} from 'features';
import { useGate, useStore } from 'effector-react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { LOCATION_TO_ID } from 'entities/smartcontract';
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
    [ContractorCabinStatus.undefined]: Loader,
};

export const ContractorCabin: FC = () => {
    const accountName = useAccountName();
    const { t } = useTranslation();

    useGate(ContractorCabinGate, { searchParam: accountName });
    const reloadPage = useReloadPage();
    const { width, height } = useDimensions();
    const isDesktop = useMediaQuery(desktopS);
    const contractorCabinStore = useStore($contractorCabin);
    const status = getStatus(contractorCabinStore);
    const navigate = useNavigate();
    const bgRatio = 1366 / 712;
    const isBgWidthHidden = width > height * bgRatio;
    const inLocation = useStore($inLocation);
    const hasInstalledEquipment = useStore($hasInstalledEquipment);
    const isContractorCabinLoading = useStore($isContractorCabinLoading);
    const unableToVisitMiningDesk = status < ContractorCabinStatus.ready;
    const unableToVisitStats = status <= ContractorCabinStatus.ready;

    const unableToVisitEquipment = !hasInstalledEquipment && !inLocation;
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
                {isContractorCabinLoading ? (
                    <Loader className={styles.loader} />
                ) : (
                    <State />
                )}
            </Monitor>
            <Tooltip
                overlay={
                    unableToVisitMiningDesk
                        ? t('pages.contractor.tooltips.notReadyMineDesk')
                        : t('components.common.button.miningDeck')
                }
            >
                <div
                    className={styles.chair}
                    onClick={() =>
                        !unableToVisitMiningDesk && navigate(PATHS.mining)
                    }
                />
            </Tooltip>
            <Tooltip
                overlay={
                    unableToVisitStats
                        ? t('pages.contractor.tooltips.unableGetStatAccess')
                        : t('components.common.statsAndInfo.title')
                }
            >
                <div
                    className={styles.monitors}
                    onClick={() =>
                        !unableToVisitStats &&
                        navigate(PATHS.contractorStatsAndInfo)
                    }
                />
            </Tooltip>
            <Tooltip overlay={t('components.contractorMenu.equipmentTooltip')}>
                <div
                    className={styles.stuff}
                    onClick={() =>
                        !unableToVisitEquipment && navigate(PATHS.equipmentSet)
                    }
                />
            </Tooltip>
            <Header />
            <ContractorMenu
                config={{
                    disabledItems: {
                        // [ContractorMenuItems.InfoPanel]: !unableToVisitStats,
                        [ContractorMenuItems.InfoPanel]: true,

                        [ContractorMenuItems.MiningDeck]:
                            unableToVisitMiningDesk,
                        [ContractorMenuItems.Equipment]: unableToVisitEquipment,
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
