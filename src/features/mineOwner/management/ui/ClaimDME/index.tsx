import { FC, useState } from 'react';
import {
    Button,
    getDmeAmount,
    ModalWithTable,
    useAccountName,
    useReloadPage,
} from 'shared';
import { useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
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

    const feeInDme = (dmeToClaim / 100) * (contract?.fee_percent || 1);
    const [claimInfoModalVisible, setClaimInfoModalVisible] = useState(false);

    const dmeMoreThenZero = Number(dmeToClaim) > 0;
    const claimDme = useSmartContractAction({ action: moclaim({ waxUser }) });
    const onDmeClick = async () => {
        await claimDme();
        await getRolesEffect({ searchParam: waxUser });
        Modal.success({
            content: t('components.common.yourDMEHasBeenClaimed'),
            onOk: reloadPage,
        });
    };

    return (
        <>
            <Button
                type="primary"
                onClick={() => setClaimInfoModalVisible(true)}
                disabled={!dmeMoreThenZero}
            >
                {t('components.common.button.claim')} {dmeToClaim}{' '}
                {t('components.common.button.dme')}
            </Button>
            <ModalWithTable
                visible={claimInfoModalVisible}
                onCancel={reloadPage}
                onSubmit={onDmeClick}
                items={{
                    [t('pages.mining.availableForClaim')]:
                        dmeToClaim.toFixed(8),
                    [t('pages.serviceMarket.contract.fee')]: Number(
                        feeInDme.toFixed(8)
                    ),
                    [t('pages.mining.transferredToYourAccount')]: Number(
                        (dmeToClaim - feeInDme).toFixed(8)
                    ),
                }}
                texts={{
                    title: t('pages.areaManagement.claim'),
                    subtitle: `${t('pages.mining.details')}:`,
                }}
            />
        </>
    );
};
