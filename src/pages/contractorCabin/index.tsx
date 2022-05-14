import React, { useState } from 'react';
import {
    ContractorMenu,
    ContractorMenuItems,
    Header,
    Monitor,
    useAccountName,
    useDimensions,
    useTableData,
} from 'shared';
import { useNavigate } from 'react-router-dom';
import { useSmartContractAction } from 'features';
import {
    getContractsConfig,
    getInventoryConfig,
    getUserConfig,
    physicalShift,
    PhysicalShiftArgs,
    UserContractsType,
    UserInfoType,
    UserInventoryType,
} from 'entities/smartcontracts';
import { equipmentSet } from '../constants';

import styles from './styles.module.scss';
import { SignContract } from './components/SignContract';
import { Setup } from './components/Setup';
import { PhysicalShiftBadge } from './components/PhysicalShiftBadge';
import { TravelModal } from './components/TravelModal';

// const equipments = [
//     {
//         name: 'Cutter',
//         isAvailable: true,
//     },
//     {
//         name: 'Delaminator',
//         isAvailable: false,
//     },
//     {
//         name: 'DME WIRE',
//         isAvailable: false,
//     },
//     {
//         name: 'Plunging box',
//         isAvailable: true,
//     },
//     {
//         name: 'Wandering reactor',
//         isAvailable: false,
//     },
// ];

export const ContractorCabin = () => {
    const accountName = useAccountName();
    const { width, height } = useDimensions();
    const [neeShiftBadge, setNeedShiftBadge] = useState(false);
    const [isTravelModalVisible, setIsTravelModalVisible] = useState(false);
    const navigate = useNavigate();
    const bgRatio = 1366 / 712;
    const isBgWidthHidden = width > height * bgRatio;

    const userInfo = useTableData<UserInfoType>(getUserConfig);
    const userContracts = useTableData<UserContractsType>(getContractsConfig);
    const userInventory = useTableData<UserInventoryType>(getInventoryConfig);
    const physicalShiftCallback = useSmartContractAction<PhysicalShiftArgs>(
        physicalShift(accountName, 4)
    );

    const hasPhysicalShift = userInfo.length > 0 && userInfo[0].location === 2;

    const openShiftBadge = () => {
        setNeedShiftBadge(true);
    };
    const closeShiftBadge = () => {
        setNeedShiftBadge(false);
    };

    const openTravelModal = () => {
        setIsTravelModalVisible(true);
    };
    const closeTravelModal = () => {
        setIsTravelModalVisible(false);
    };

    const getMonitorContent = () => {
        if (userContracts.length === 0) {
            return <SignContract />;
        }

        // const inventoryCount = Object.keys(ID_TO_INVENTORY).length;
        // const activeInventory = userInventory.filter((v) => v.activated);
        // if (activeInventory.length < inventoryCount) {
        //     const activeInventoryIds = activeInventory.map(
        //         (v) => v.asset_template_id
        //     );
        //     const equipments = Object.entries(ID_TO_INVENTORY).map(
        //         ([id, name]) => ({
        //             name,
        //             isAvailable: activeInventoryIds.includes(+id),
        //         })
        //     );
        //     return <Welcome equipments={equipments} />;
        // }

        return (
            <Setup
                hasShift={hasPhysicalShift}
                onMount={openShiftBadge}
                onUnmount={closeShiftBadge}
            />
        );
    };

    const handleCallShift = async () => {
        await physicalShiftCallback();
        closeShiftBadge();
    };

    return (
        <div className={styles.cabinBackground}>
            <Monitor
                className={
                    isBgWidthHidden
                        ? styles.cabinMonitorWidth
                        : styles.cabinMonitorHeight
                }
            >
                {getMonitorContent()}
                {/* <Ready /> */}
                {/* <MiningOver /> */}
                {/* <MiningResults /> */}
                {/* <MiningProgress msUntil={15 * 60 * 60 * 1000} /> */}
                {/* <MiningError /> */}
            </Monitor>
            <Header />
            <ContractorMenu
                config={{
                    disabledItems: {
                        [ContractorMenuItems.InfoPanel]: true,
                        [ContractorMenuItems.MiningDeck]: false,
                    },
                    callbacks: {
                        [ContractorMenuItems.InfoPanel]: () => {},
                        [ContractorMenuItems.MiningDeck]: () =>
                            navigate('/mining'),
                    },
                    activeTooltip: ContractorMenuItems.InfoPanel,
                    primaryButtonVisibility: true,
                    primaryButtonCallback: () => navigate(equipmentSet),
                }}
            />
            {neeShiftBadge && (
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
