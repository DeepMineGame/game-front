import { useCallback, useEffect, useState } from 'react';
import {
    desktopS,
    DrillBitOutlined,
    Header,
    Menu,
    MenuItem,
    Monitor,
    useDimensions,
    useMediaQuery,
    useReloadPage,
    useTableData,
} from 'shared';
import { useNavigate } from 'react-router-dom';
import * as paths from 'app/router/paths';
import cn from 'classnames';
import { findEquipmentByName, Travel } from 'features';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { DesktopOutlined, ToolOutlined } from '@ant-design/icons';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    getContractsNameConfig,
    getHistoryConfig,
    getInventoryConfig,
    getUserConfig,
    InUseType,
    LOCATION_TO_ID,
    mapSearchParamForIndexPositionToFindContracts,
    miningEquipmentNames,
    UserHistoryType,
    UserInfoType,
    UserInventoryType,
} from 'entities/smartcontract';

import { CABIN_STATUS } from './constants';
import styles from './styles.module.scss';
import { ContractorCabinContent } from './components/ContractorCabinContent';

export const ContractorCabin = () => {
    const reloadPage = useReloadPage();
    const { width, height } = useDimensions();
    const isDesktop = useMediaQuery(desktopS);
    const [needShiftBadge, setNeedShiftBadge] = useState(false);
    const [status, setStatus] = useState<CABIN_STATUS>(0);
    const navigate = useNavigate();
    const bgRatio = 1366 / 712;
    const isBgWidthHidden = width > height * bgRatio;

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
    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);
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

    const openShiftBadge = () => {
        setNeedShiftBadge(true);
    };
    const closeShiftBadge = () => {
        setNeedShiftBadge(false);
    };

    useEffect(() => {
        if (
            status >= CABIN_STATUS.setup &&
            !hasPhysicalShift &&
            !needShiftBadge
        ) {
            openShiftBadge();
        } else if (needShiftBadge) {
            closeShiftBadge();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, hasPhysicalShift]);

    const { t } = useTranslation();

    const contractorMenuItems = [
        {
            disabled: status <= CABIN_STATUS.mining_over,
            onClick: () => navigate(paths.contractorStatsAndInfo),
            icon: <DesktopOutlined />,
            tooltipOverlay: t('components.contractorMenu.infoPanelTooltip'),
        },
        {
            disabled: status < CABIN_STATUS.ready,
            onClick: () => navigate(paths.mining),
            icon: <DrillBitOutlined />,
            tooltipOverlay: t('components.contractorMenu.miningDeskTooltip'),
        },
        {
            disabled: !hasInstalledEquipment && !hasPhysicalShift,
            onClick: () => navigate(paths.equipmentSet),
            icon: <ToolOutlined />,
            tooltipOverlay: t('components.contractorMenu.equipmentTooltip'),
        },
    ];

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
                    userContracts={mineOwnerContracts}
                    userInventory={userInventory}
                    userHistory={userHistory}
                />
            </Monitor>
            <Header withBackButton />
            <Menu>
                <Space size="middle">
                    {contractorMenuItems.map((item) => (
                        <MenuItem {...item} />
                    ))}
                </Space>
            </Menu>
            {needShiftBadge && (
                <Travel
                    onBadgeCrossClick={closeShiftBadge}
                    toLocationId={LOCATION_TO_ID.mine}
                    onSuccess={reloadPage}
                />
            )}
        </div>
    );
};
