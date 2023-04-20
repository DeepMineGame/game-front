import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SignLevelUpgradeOrderModal, useReloadPage } from 'shared';
import { useSmartContractAction } from 'features';
import { message } from 'antd';
import { ContractDto, signOrder } from 'entities/smartcontract';

type Props = {
    contract: ContractDto;
    accountName: string;
};

export const SignLevelUpgradeOrder: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const [signLevelUpgradeOrderModalOpen, setSignLevelUpgradeOrderModalOpen] =
        useState(false);

    const isCitizenOrder = contract.client === accountName;
    const isEngineerOrder = contract.executor === accountName;

    const signOrderAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            contractId: contract.id,
        }),
        onSignSuccess: () => {
            message.success(
                t('pages.serviceMarket.contract.successfullySigned')
            );
            setTimeout(reloadPage, 1500);
        },
    });

    const onSign = async () => {
        if (isCitizenOrder) {
            setSignLevelUpgradeOrderModalOpen(true);
            return;
        }

        if (isEngineerOrder) {
            await signOrderAction();
        }
    };

    return (
        <>
            <Button onClick={onSign} type="primary">
                {t('pages.serviceMarket.order.signOrder')}
            </Button>
            <SignLevelUpgradeOrderModal
                visible={signLevelUpgradeOrderModalOpen}
                contract={contract}
                onCancel={() => setSignLevelUpgradeOrderModalOpen(false)}
                title={t('pages.serviceMarket.order.signOrder')}
                onSignSuccess={() => {
                    setSignLevelUpgradeOrderModalOpen(false);
                    message.success(
                        t('pages.serviceMarket.contract.successfullySigned')
                    );
                    setTimeout(reloadPage, 1500);
                }}
            />
        </>
    );
};
