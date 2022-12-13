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
import {
    extractFeeToClaimAttr,
    rolesStore,
    UserRoles,
    moclaim,
    getRolesEffect,
    ContractDto,
} from 'entities/smartcontract';

const fromUnit = (num: number) => num / 10 ** 8;
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
        ? fromUnit(extractFeeToClaimAttr(mineOwnerRole[0]))
        : 0;

    const feeInDme =
        (getDmeAmount(dmeToClaim) / 100) * (contract?.fee_percent || 1);
    const [claimInfoModalVisible, setClaimInfoModalVisable] = useState(false);

    const dmeMoreThenZero = Number(dmeToClaim) > 0;
    const claimDme = useSmartContractAction({ action: moclaim({ waxUser }) });
    const onDmeClick = async () => {
        await claimDme();
        await getRolesEffect({ searchParam: waxUser });
        setClaimInfoModalVisable(true);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={onDmeClick}
                disabled={!dmeMoreThenZero}
            >
                {t('components.common.button.claim')} {dmeToClaim}{' '}
                {t('components.common.button.dme')}
            </Button>
            <ModalWithTable
                visible={claimInfoModalVisible}
                onCancel={reloadPage}
                onSubmit={reloadPage}
                items={{
                    [t('pages.mining.availableForClaim')]:
                        dmeToClaim.toFixed(8),
                    [t('pages.serviceMarket.contract.fee')]: Number(
                        feeInDme.toFixed(8)
                    ),
                    [t('pages.mining.transferredToYourAccount')]: Number(
                        (getDmeAmount(dmeToClaim) - feeInDme).toFixed(8)
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
