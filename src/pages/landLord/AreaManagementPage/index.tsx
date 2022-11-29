import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

import { Page, useAccountName, useReloadPage, useUserLocation } from 'shared';
import {
    $contracts,
    AreaClaim,
    AreaManagementTable,
    CallToTravelNotification,
    LandlordContractsGate,
    getLandlordContractsEffect,
    minesForAreaSlots,
    userAreaNftStore,
    PlaceMyselfMineAsOwner,
} from 'features';

import {
    areasStore,
    ContractStatus,
    InventoryType,
    LOCATION_TO_ID,
} from 'entities/smartcontract';
import styles from './styles.module.scss';

export const AreaManagementPage = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();

    useGate(LandlordContractsGate, { searchParam: accountName });
    const mines = useStore(minesForAreaSlots);
    const area = useStore(areasStore);
    const userLocation = useUserLocation();
    const areas = useStore(userAreaNftStore);

    const contracts = useStore($contracts);
    const isContractsLoading = useStore(getLandlordContractsEffect.pending);

    const contractsToSign = contracts.filter(
        (contract) =>
            contract.activation_time === 0 &&
            contract.status !== ContractStatus.terminated
    );

    const areaItem = areas?.find(
        ({ inv_type }) => inv_type === InventoryType.areas
    );
    const areaId = areaItem ? +areaItem.asset_id : undefined;
    const isActive = !!areaItem?.in_use;
    const reloadPage = useReloadPage();

    const currentMineSlots = mines?.length ?? 0;
    const maxMineSlots = area?.[0]?.mine_slots.length ?? 0;

    return (
        <Page headerTitle={t('pages.areaManagement.title')}>
            {accountName && (
                <AreaClaim
                    isActive={isActive}
                    areaId={areaId}
                    accountName={accountName}
                />
            )}
            <PlaceMyselfMineAsOwner
                contract={contractsToSign[0]}
                accountName={accountName}
                isDisabled={isContractsLoading}
            />
            <div className={styles.miningSlots}>
                {t('pages.areaManagement.mineSlots')}{' '}
                <span>
                    {currentMineSlots}/{maxMineSlots}
                </span>
            </div>
            {accountName && (
                <AreaManagementTable
                    disabled={!isActive}
                    accountName={accountName}
                    ownContracts={contractsToSign}
                />
            )}
            {!userLocation.landlordReception && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.landlords_reception}
                    onSuccess={reloadPage}
                />
            )}
        </Page>
    );
};
