import React, { useEffect, useState } from 'react';
import {
    ContractorMenu,
    ContractorMenuItems,
    desktopS,
    Header,
    Monitor,
    useAccountName,
    useDimensions,
    useMediaQuery,
    useTableData,
} from 'shared';
import { useNavigate } from 'react-router-dom';
import { useSmartContractAction } from 'features';
import * as PATHS from 'app/router/paths';
import cn from 'classnames';
import {
    getContractsByNickNameConfig,
    getHistoryConfig,
    getInventoryConfig,
    getUserConfig,
    LOCATION_TO_ID,
    physicalShift,
    PhysicalShiftArgs,
    UserContractsType,
    UserHistoryType,
    UserInfoType,
    UserInventoryType,
} from 'entities/smartcontracts';

import { CABIN_STATUS } from '../constants';
import styles from './styles.module.scss';
import { PhysicalShiftBadge } from './components/PhysicalShiftBadge';
import { TravelModal } from './components/TravelModal';
import { ContractorCabinContent } from './components/ContractorCabinContent';

export const ContractorCabin = () => {
    const accountName = useAccountName();
    const { width, height } = useDimensions();
    const isDesktop = useMediaQuery(desktopS);
    const [needShiftBadge, setNeedShiftBadge] = useState(false);
    const [isTravelModalVisible, setIsTravelModalVisible] = useState(false);
    const [status, setStatus] = useState(0);
    const navigate = useNavigate();
    const bgRatio = 1366 / 712;
    const isBgWidthHidden = width > height * bgRatio;

    const userInfo = useTableData<UserInfoType>(getUserConfig);
    const userContracts = useTableData<UserContractsType>(
        getContractsByNickNameConfig
    );
    const userInventory = useTableData<UserInventoryType>(getInventoryConfig);
    const userHistory = useTableData<UserHistoryType>(getHistoryConfig);
    const physicalShiftCallback = useSmartContractAction<PhysicalShiftArgs>(
        physicalShift(accountName, LOCATION_TO_ID.cabinet)
    );

    const hasPhysicalShift =
        userInfo.length > 0 && userInfo[0].location === LOCATION_TO_ID.cabinet;

    const openShiftBadge = () => {
        setNeedShiftBadge(true);
    };
    const closeShiftBadge = () => {
        setNeedShiftBadge(false);
    };
    useEffect(() => {
        if (status === CABIN_STATUS.setup && !needShiftBadge) {
            openShiftBadge();
        }
        if (status !== CABIN_STATUS.setup && needShiftBadge) {
            closeShiftBadge();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    const openTravelModal = () => {
        setIsTravelModalVisible(true);
    };
    const closeTravelModal = () => {
        setIsTravelModalVisible(false);
    };

    const handleCallShift = async () => {
        await physicalShiftCallback();
        setNeedShiftBadge(false);
    };

    return (
        <div
            className={cn(styles.cabinBackground, {
                [styles.cabinBackgroundLightRed]:
                    status === CABIN_STATUS.mining_interrupted,
                [styles.cabinBackgroundLightGreen]:
                    status > CABIN_STATUS.mining_over ||
                    status === CABIN_STATUS.ready ||
                    status === CABIN_STATUS.setup,
                [styles.cabinBackgroundLightYellow]:
                    status === CABIN_STATUS.mining_over ||
                    status === CABIN_STATUS.mining_progress,
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
                    setStatus={setStatus}
                    userContracts={userContracts}
                    userInventory={userInventory}
                    userHistory={userHistory}
                />
            </Monitor>
            <Header />
            <ContractorMenu
                config={{
                    disabledItems: {
                        [ContractorMenuItems.InfoPanel]:
                            status <= CABIN_STATUS.mining_over,
                        [ContractorMenuItems.MiningDeck]:
                            status <= CABIN_STATUS.ready,
                        [ContractorMenuItems.Equipment]: !hasPhysicalShift,
                    },
                    callbacks: {
                        [ContractorMenuItems.InfoPanel]: () =>
                            navigate('/TODO'),
                        [ContractorMenuItems.MiningDeck]: () =>
                            navigate(PATHS.mining),
                        [ContractorMenuItems.Equipment]: () =>
                            navigate(PATHS.equipmentSet),
                    },
                    // activeTooltip: ContractorMenuItems.InfoPanel,
                }}
            />
            {needShiftBadge && (
                <PhysicalShiftBadge
                    onClose={closeShiftBadge}
                    onClick={openTravelModal}
                />
            )}
            <TravelModal
                visible={isTravelModalVisible}
                onClick={handleCallShift}
                onClose={closeTravelModal}
            />
        </div>
    );
};
