import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';

import {
    Button,
    Page,
    useAccountName,
    useReloadPage,
    useUserLocation,
} from 'shared';
import {
    AreaClaim,
    AreaManagementTable,
    CallToTravelNotification,
    $MineOwnerContracts,
    MineOwnerContractsGate,
    getMineOwnerContractsFx,
    userAreaNftStore,
    PlaceMyselfMineAsOwner,
    $area,
    UserAreaGate,
    SlotStatistics,
    AddNewMine,
    AreaGate,
} from 'features';

import { Col, Row, Space } from 'antd';
import { UnlockOutlined } from '@ant-design/icons';
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
    useGate(AreaGate, { searchParam: accountName });

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
    const setSelfButton = (
        <PlaceMyselfMineAsOwner
            contract={contractsToSign[0]}
            accountName={accountName}
            isDisabled={!!selfSignedContracts.length || isContractsLoading}
        />
    );
    return (
        <Page
            headerTitle={t('pages.areaManagement.title')}
            className={styles.body}
        >
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
                <SlotStatistics area={area} />
                <Row justify="center" gutter={16}>
                    <Col span={4}>
                        <Button
                            block
                            type="ghost"
                            disabled
                            icon={<UnlockOutlined />}
                        >
                            {t('Open new mine spot')}
                        </Button>
                    </Col>
                    <Col span={4} flex="center">
                        <AddNewMine />
                    </Col>
                    <Col span={4}>{setSelfButton}</Col>
                </Row>
                {areaId && (
                    <AreaManagementTable
                        disabled={!isActive}
                        ownContracts={contractsToSign}
                        areaId={areaId}
                    />
                )}
            </Space>
            {!userLocation.landlordReception && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.landlords_reception}
                    onSuccess={reloadPage}
                />
            )}
        </Page>
    );
};
