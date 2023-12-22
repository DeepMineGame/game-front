import { FC, useState } from 'react';
import {
    Button,
    ModalWithTable,
    useAccountName,
    useReloadPage,
    useUserLocation,
} from 'shared';
import { useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';
import { moclaim, ContractDto } from 'entities/smartcontract';
import { $mineOwnerManagementData } from '../../../models/mineOwnerManagement';

export const ClaimDME: FC<{ contract: ContractDto | null }> = ({
    contract,
}) => {
    const { modal } = App.useApp();

    const inLocation = useUserLocation();
    const waxUser = useAccountName();
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const mineOwnerManagementData = useStore($mineOwnerManagementData);

    const dmeToClaim = mineOwnerManagementData?.dme_to_claim || 0;

    const feeInDme = dmeToClaim * (contract?.fee_percent || 1);
    const [claimInfoModalVisible, setClaimInfoModalVisible] = useState(false);

    const dmeMoreThenZero = Number(dmeToClaim) > 0;
    const claimDme = useSmartContractAction({ action: moclaim({ waxUser }) });
    const onDmeClick = async () => {
        await claimDme();
        modal.success({
            content: t('components.common.yourDMEHasBeenClaimed'),
            onOk: reloadPage,
        });
    };

    return (
        <>
            <Button
                block
                type="primary"
                onClick={() => setClaimInfoModalVisible(true)}
                disabled={!dmeMoreThenZero || !inLocation.mineDeck}
            >
                {t('components.common.button.claim')} {dmeToClaim}{' '}
                {t('components.common.button.dme')}
            </Button>
            <ModalWithTable
                visible={claimInfoModalVisible}
                onCancel={reloadPage}
                onSubmit={onDmeClick}
                items={{
                    [t('Available for claim')]: Number(feeInDme.toFixed(2)),
                    [t('pages.serviceMarket.contract.fee')]: Number(
                        feeInDme - dmeToClaim
                    ),

                    [t('pages.mining.transferredToYourAccount')]: dmeToClaim,
                }}
                texts={{
                    title: t('Claim DME'),
                    subtitle: `${t('pages.mining.details')}:`,
                }}
            />
        </>
    );
};
