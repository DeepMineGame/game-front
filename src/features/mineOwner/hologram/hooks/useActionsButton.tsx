import { useTranslation } from 'react-i18next';
import {
    ActionModal,
    Button,
    desktopS,
    success,
    useAccountName,
    useMediaQuery,
    useReloadPage,
} from 'shared';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, serviceMarket, warehouse } from 'app/router/paths';
import { ATOMICHUB_URL } from 'app';
import { useStore } from 'effector-react';
import { ServiceMarketTabIds } from 'app/router/constants';
import {
    ContractType,
    createContrFormFields,
    ContractRole,
    setupMine,
} from 'entities/smartcontract';
import {
    mineOwnerCabinState,
    mineOwnerLandlordContractForUserStore,
} from '../../models';
import { useSmartContractAction } from '../../../hooks';

export function useActionsButton() {
    const [isSetupMineModalVisible, setSetupMineModalVisible] = useState(false);

    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const navigate = useNavigate();
    const accountName = useAccountName();
    const contract = useStore(mineOwnerLandlordContractForUserStore);
    const reloadPage = useReloadPage();

    const setupMineAction = useSmartContractAction(
        setupMine({
            waxUser: accountName,
            // @ts-ignore
            contractId: contract?.id!,
        })
    );

    const setupSignAndReload = async () => {
        await setupMineAction();
        success({
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
                    onClick={() => window.open(ATOMICHUB_URL, '_blank')}
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
                    onClick={() => window.open(ATOMICHUB_URL, '_blank')}
                >
                    {isDesktop
                        ? t('features.mineOwner.goToMarket')
                        : t('features.mineOwner.market')}
                </Button>
            </div>
        ),
        [mineOwnerCabinState.needContractWithLandlord]: (
            <div>
                <Button
                    type="link"
                    onClick={() =>
                        navigate(
                            `${serviceMarket}?tabId=${ServiceMarketTabIds.mineOperation}`
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
                            `${createOrder}?${createContrFormFields.contractType}=${ContractType.landlord_mineowner}&${createContrFormFields.isClient}=${ContractRole.executor}`
                        )
                    }
                >
                    {isDesktop
                        ? t('features.mineOwner.createContract')
                        : t('features.mineOwner.create')}
                </Button>
            </div>
        ),
        [mineOwnerCabinState.needSetupMine]: (
            <>
                <ActionModal
                    submitText={t('components.common.button.activate')}
                    visible={isSetupMineModalVisible}
                    onCancel={() => setSetupMineModalVisible(false)}
                    onSubmit={setupSignAndReload}
                    title={t('features.mineOwner.setupMine')}
                />
                <Button
                    type="link"
                    onClick={() => setSetupMineModalVisible(true)}
                >
                    {t('features.mineOwner.setupMine')}
                </Button>
            </>
        ),
        [mineOwnerCabinState.everythingIsDone]: null,
        [mineOwnerCabinState.needActivateMine]: null,
        [mineOwnerCabinState.needCrew]: null,
    };
}
