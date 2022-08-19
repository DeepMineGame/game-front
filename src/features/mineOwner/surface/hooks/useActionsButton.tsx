import { useTranslation } from 'react-i18next';
import {
    ActionModal,
    Button,
    desktopS,
    useAccountName,
    useMediaQuery,
    useReloadPage,
} from 'shared';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, serviceMarket, warehouse } from 'app/router/paths';
import { ATOMICHUB_URL } from 'app';
import { useStore } from 'effector-react';
import {
    ContractType,
    createContrFormFields,
    setupMine,
} from 'entities/smartcontract';
import { mineOwnerCabinState } from '../../models/mineOwnerState';
import { useSmartContractAction } from '../../../hooks';
import { mineOwnerLandlordContractForUserStore } from '../../models';

export const useActionsButton = () => {
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
        reloadPage();
    };
    return {
        [mineOwnerCabinState.isOutsideFromLocation]: null,
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
        [mineOwnerCabinState.hasNoMineNft]: (
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
        [mineOwnerCabinState.needSignContractWithLandLord]: (
            <div>
                <Button type="link" onClick={() => navigate(serviceMarket)}>
                    {isDesktop
                        ? t('features.mineOwner.chooseContract')
                        : t('features.mineOwner.choose')}
                </Button>
                <Button
                    type="link"
                    onClick={() =>
                        navigate(
                            `${createOrder}?${createContrFormFields.contractType}=${ContractType.landlord_mineowner}&${createContrFormFields.isClient}=0`
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
                    title={t('pages.features.mineOwner.setupMine')}
                />
                <Button
                    type="link"
                    onClick={() => setSetupMineModalVisible(true)}
                >
                    {t('features.mineOwner.setupMine')}
                </Button>
            </>
        ),
        [mineOwnerCabinState.isMineSet]: null,
        [mineOwnerCabinState.isMineSetupInProgress]: null,
        [mineOwnerCabinState.isMineActive]: null,
    };
};
