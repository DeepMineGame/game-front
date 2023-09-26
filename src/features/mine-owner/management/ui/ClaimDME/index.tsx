import { FC, useState } from 'react';
import {
    Button,
    getDmeAmount,
    ModalWithTable,
    useAccountName,
    useReloadPage,
    useUserLocation,
} from 'shared';
import { useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';
import {
    extractFeeToClaimAttr,
    rolesStore,
    UserRoles,
    moclaim,
    getRolesEffect,
    ContractDto,
} from 'entities/smartcontract';

export const ClaimDME: FC<{ contract: ContractDto | null }> = ({
    contract,
}) => {
    const { modal } = App.useApp();

    const inLocation = useUserLocation();
    const waxUser = useAccountName();
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const roles = useStore(rolesStore);
    const mineOwnerRole = roles?.filter(
        ({ role }) => role === UserRoles.mine_owner
    );
    const dmeToClaim = mineOwnerRole?.length
        ? getDmeAmount(extractFeeToClaimAttr(mineOwnerRole[0]))
        : 0;

    const feeInDme = dmeToClaim * (contract?.fee_percent || 1);
    const [claimInfoModalVisible, setClaimInfoModalVisible] = useState(false);

    const dmeMoreThenZero = Number(dmeToClaim) > 0;
    const claimDme = useSmartContractAction({ action: moclaim({ waxUser }) });
    const onDmeClick = async () => {
        await claimDme();
        await getRolesEffect({ searchParam: waxUser });
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
                {t('components.common.button.claim')} {dmeToClaim.toFixed(2)}{' '}
                {t('components.common.button.dme')}
            </Button>
            <ModalWithTable
                visible={claimInfoModalVisible}
                onCancel={reloadPage}
                onSubmit={onDmeClick}
                items={{
                    [t('Available for claim')]: Number(feeInDme.toFixed(2)),
                    [t('pages.serviceMarket.contract.fee')]: Number(
                        (feeInDme - dmeToClaim).toFixed(2)
                    ),

                    [t('pages.mining.transferredToYourAccount')]:
                        dmeToClaim.toFixed(2),
                }}
                texts={{
                    title: t('Claim DME'),
                    subtitle: `${t('pages.mining.details')}:`,
                }}
            />
        </>
    );
};
