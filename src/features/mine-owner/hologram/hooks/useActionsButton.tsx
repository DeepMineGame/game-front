import { useTranslation } from 'react-i18next';
import {
    ActionModal,
    Button,
    desktopS,
    useAccountName,
    useMediaQuery,
    useReloadPage,
    useTravelConfirm,
    useUserLocation,
} from 'shared';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createOrder,
    mineManagement,
    serviceMarket,
    warehouse,
} from 'app/router/paths';
import {
    AtomicHubMarketSections,
    getAtomicHubUrlToSection,
} from 'app/constants';
import { useStore } from 'effector-react';
import { App } from 'antd';
import {
    ContractType,
    ContractRole,
    setupMine,
    LOCATION_TO_ID,
} from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import { Roles } from 'entities/game-stat';
import {
    mineOwnerCabinState,
    mineOwnerLandlordContractForUserStore,
} from '../../models';
import { useSmartContractAction } from '../../../hooks';
import { $indicateActionDetails } from '../../../action-indicator';

export function useActionsButton() {
    const [isSetupMineModalVisible, setSetupMineModalVisible] = useState(false);
    const { modal } = App.useApp();

    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const navigate = useNavigate();
    const accountName = useAccountName();
    const contract = useStore(mineOwnerLandlordContractForUserStore);
    const reloadPage = useReloadPage();
    const inLocation = useUserLocation();
    const { travelConfirm } = useTravelConfirm(LOCATION_TO_ID.mine_deck);
    const atomicHubStructuresLink = getAtomicHubUrlToSection(
        AtomicHubMarketSections.structures
    );
    const lastAction = useStore($indicateActionDetails);
    const isLastActionFinished = Date.now() >= lastAction.finishAt;
    const contractButton = (
        <div>
            <Button
                type="link"
                onClick={() =>
                    navigate(
                        `${serviceMarket}?user_role=${Roles.mineowner}&search_role=${Roles.landlord}`
                    )
                }
            >
                {isDesktop
                    ? t('features.mineOwner.chooseContract')
                    : t('features.mineOwner.choose')}
            </Button>
            <Button
                type="link"
                onClick={() =>
                    navigate(
                        `${createOrder}?${orderFields.contractType}=${ContractType.landlord_mineowner}&${orderFields.isClient}=${ContractRole.executor}`
                    )
                }
            >
                {isDesktop
                    ? t('features.mineOwner.createContract')
                    : t('features.mineOwner.create')}
            </Button>
        </div>
    );

    const setupMineAction = useSmartContractAction({
        action: setupMine({
            waxUser: accountName,
            // @ts-ignore
            contractId: contract?.id!,
        }),
    });

    const setupSignAndReload = async () => {
        await setupMineAction();
        modal.success({
            title: t('features.mineOwner.setupMine'),
            content: t('features.mineOwner.mineIsSet'),
            onOk: reloadPage,
        });
    };
    return {
        [mineOwnerCabinState.needPhysicalShift]: null,
        [mineOwnerCabinState.initial]: (
            <div>
                <Button type="link" onClick={() => navigate(warehouse)}>
                    {isDesktop
                        ? t('features.mineOwner.pickUpFromStorage')
                        : t('features.mineOwner.storage')}
                </Button>
                <Button
                    type="link"
                    onClick={() =>
                        window.open(atomicHubStructuresLink, '_blank')
                    }
                >
                    {isDesktop
                        ? t('features.mineOwner.goToMarket')
                        : t('features.mineOwner.market')}
                </Button>
            </div>
        ),
        [mineOwnerCabinState.needMineNft]: (
            <div>
                <Button type="link" onClick={() => navigate(warehouse)}>
                    {isDesktop
                        ? t('features.mineOwner.pickUpFromStorage')
                        : t('features.mineOwner.storage')}
                </Button>
                <Button
                    type="link"
                    onClick={() =>
                        window.open(atomicHubStructuresLink, '_blank')
                    }
                >
                    {isDesktop
                        ? t('features.mineOwner.goToMarket')
                        : t('features.mineOwner.market')}
                </Button>
            </div>
        ),
        [mineOwnerCabinState.needContractWithLandlord]: contractButton,
        [mineOwnerCabinState.mineIsDepthChanging]: (
            <Button type="link" onClick={() => navigate(mineManagement)}>
                {t('features.mineOwner.mineManagement')}
            </Button>
        ),

        [mineOwnerCabinState.needSetupMine]: isLastActionFinished && (
            <>
                <ActionModal
                    texts={{
                        onOk: t('Setup'),
                        title: t('features.mineOwner.setupMine'),
                    }}
                    costs={{ timeSeconds: 1 }}
                    visible={isSetupMineModalVisible}
                    onCancel={() => setSetupMineModalVisible(false)}
                    onSubmit={
                        inLocation.mineDeck
                            ? setupSignAndReload
                            : () => travelConfirm(reloadPage)
                    }
                />
                <Button onClick={() => setSetupMineModalVisible(true)}>
                    {t('features.mineOwner.setupMine')}
                </Button>
            </>
        ),
        [mineOwnerCabinState.everythingIsDone]: null,
        [mineOwnerCabinState.needActivateMine]: null,
        [mineOwnerCabinState.needCrew]: null,
        [mineOwnerCabinState.contractWithLandlordWasTerminated]: contractButton,
    };
}
