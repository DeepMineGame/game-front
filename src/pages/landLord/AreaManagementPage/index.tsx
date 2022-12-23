import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

import { Page, useAccountName, useReloadPage, useUserLocation } from 'shared';
import {
    AreaClaim,
    AreaManagementTable,
    CallToTravelNotification,
    $MineOwnerContracts,
    MineOwnerContractsGate,
    getMineOwnerContractsFx,
    minesForAreaSlots,
    userAreaNftStore,
    PlaceMyselfMineAsOwner,
    $contracts,
    LandlordContractsGate,
} from 'features';

import {
    areasStore,
    ContractStatus,
    ContractType,
    InventoryType,
    LOCATION_TO_ID,
} from 'entities/smartcontract';
import styles from './styles.module.scss';

export const AreaManagementPage = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();

    useGate(MineOwnerContractsGate, { searchParam: accountName });
    useGate(LandlordContractsGate, { searchParam: accountName });
    const mines = useStore(minesForAreaSlots);
    const area = useStore(areasStore);
    const userLocation = useUserLocation();
    const areas = useStore(userAreaNftStore);

    const mineOwnerContracts = useStore($MineOwnerContracts);
    const landLordContracts = useStore($contracts);
    const isContractsLoading = useStore(getMineOwnerContractsFx.pending);
    console.log(landLordContracts);
    const contractsToSign = mineOwnerContracts.filter(
        (contract) =>
            contract.type === ContractType.landlord_mineowner &&
            contract.activation_time === 0 &&
            contract.status !== ContractStatus.terminated
    );

    const selfSignedContracts = mineOwnerContracts.filter(
        (contract) =>
            contract.type === ContractType.landlord_mineowner &&
            contract.client === contract.executor &&
            contract.activation_time !== 0 &&
            contract.deadline_time * 1000 > Date.now() &&
            contract.status === ContractStatus.active
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
                isDisabled={!!selfSignedContracts.length || isContractsLoading}
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
                    selfSignedContracts={selfSignedContracts}
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
