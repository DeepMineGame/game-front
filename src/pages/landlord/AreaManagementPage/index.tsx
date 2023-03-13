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
    userAreaNftStore,
    PlaceMyselfMineAsOwner,
    SlotStatistics,
    $area,
    UserAreaGate,
} from 'features';

import { Space } from 'antd';
import { InventoryType, LOCATION_TO_ID } from 'entities/smartcontract';
import {
    getActiveSelfSignedContract,
    getNotSignedSelfContract,
} from 'entities/contract';
import styles from './styles.module.scss';

export const AreaManagementPage = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();

    useGate(MineOwnerContractsGate, { searchParam: accountName });
    useGate(UserAreaGate, { searchParam: accountName });
    const area = useStore($area);
    const userLocation = useUserLocation();
    const areas = useStore(userAreaNftStore);

    const mineOwnerContracts = useStore($MineOwnerContracts);
    const isContractsLoading = useStore(getMineOwnerContractsFx.pending);

    const contractsToSign = mineOwnerContracts.filter(getNotSignedSelfContract);
    const selfSignedContracts = mineOwnerContracts.filter(
        getActiveSelfSignedContract
    );

    const areaItem = areas?.find(
        ({ inv_type }) => inv_type === InventoryType.areas
    );
    const areaId = areaItem ? +areaItem.asset_id : undefined;
    const isActive = !!areaItem?.in_use;
    const reloadPage = useReloadPage();

    return (
        <Page headerTitle={t('pages.areaManagement.title')}>
            <Space
                size="large"
                direction="vertical"
                className={styles.headerAndStat}
            >
                <AreaClaim
                    isActive={isActive}
                    areaId={areaId}
                    accountName={accountName}
                />
                {area && <SlotStatistics area={area} />}
            </Space>
            <PlaceMyselfMineAsOwner
                contract={contractsToSign[0]}
                accountName={accountName}
                isDisabled={!!selfSignedContracts.length || isContractsLoading}
            />
            {area && (
                <AreaManagementTable
                    area={area}
                    disabled={!isActive}
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
