import { FC, useCallback } from 'react';
import {
    desktopS,
    Header,
    Monitor,
    useDimensions,
    useMediaQuery,
    useReloadPage,
    useTableData,
    useUserLocation,
} from 'shared';
import { useNavigate } from 'react-router-dom';
import * as PATHS from 'app/router/paths';
import cn from 'classnames';
import {
    $contractorStatus,
    ContractorCabinStatus,
    ContractorMenu,
    ContractorMenuItems,
    findEquipmentByName,
    Travel,
} from 'features';
import { useStore } from 'effector-react';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    getContractsNameConfig,
    getHistoryConfig,
    getUserConfig,
    InUseType,
    LOCATION_TO_ID,
    mapSearchParamForIndexPositionToFindContracts,
    miningEquipmentNames,
    UserHistoryType,
    UserInfoType,
} from 'entities/smartcontract';
import { $inventoriedAssets } from 'entities/atomicassets';
import styles from './styles.module.scss';
import { ContractorCabinContent } from './components/ContractorCabinContent';

export const ContractorCabin: FC = () => {
    const reloadPage = useReloadPage();
    const { width, height } = useDimensions();
    const isDesktop = useMediaQuery(desktopS);
    const status = useStore($contractorStatus);
    const navigate = useNavigate();
    const bgRatio = 1366 / 712;
    const isBgWidthHidden = width > height * bgRatio;
    const inLocation = useUserLocation();

    // FIXME: Move logic to contractor/cabin/model

    const getConfigForContracts = useCallback((accountName: string) => {
        return getContractsNameConfig(
            accountName,
            mapSearchParamForIndexPositionToFindContracts.executorId,
            10000
        );
    }, []);

    const { data: userInfo } = useTableData<UserInfoType>(getUserConfig);
    const { data: userContracts } = useTableData<ContractDto>(
        getConfigForContracts
    );
    const userInventory = useStore($inventoriedAssets);
    const { data: userHistory } =
        useTableData<UserHistoryType>(getHistoryConfig);

    const installedMiningEquipment = Object.fromEntries(
        miningEquipmentNames.map((name) => [
            name,
            findEquipmentByName(userInventory || [], name),
        ])
    );
    const hasInstalledEquipment = Object.values(installedMiningEquipment)?.some(
        (item) => item?.in_use === InUseType.inUse
    );

    const mineOwnerContracts = userContracts.filter(
        ({ type, executor, status: contractStatus }) =>
            type === ContractType.mineowner_contractor &&
            executor === userInfo[0]?.owner &&
            contractStatus === ContractStatus.active
    );
    const hasPhysicalShift =
        userInfo.length > 0 && userInfo[0].location === LOCATION_TO_ID.mine;

    const getActiveTooltip = () => {
        if (
            status === ContractorCabinStatus.no_equipments &&
            hasPhysicalShift
        ) {
            return ContractorMenuItems.Equipment;
        }

        if (status === ContractorCabinStatus.ready) {
            return ContractorMenuItems.MiningDeck;
        }

        if (status === ContractorCabinStatus.last_results) {
            return ContractorMenuItems.InfoPanel;
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
                <ContractorCabinContent
                    hasPhysicalShift={hasPhysicalShift}
                    userContracts={mineOwnerContracts}
                    userInventory={userInventory}
                    userHistory={userHistory}
                />
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
                            !hasInstalledEquipment && !hasPhysicalShift,
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
            {!inLocation.mine && (
                <Travel
                    toLocationId={LOCATION_TO_ID.mine}
                    onSuccess={reloadPage}
                />
            )}
        </div>
    );
};
