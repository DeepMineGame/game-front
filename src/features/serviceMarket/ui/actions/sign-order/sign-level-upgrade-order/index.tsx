import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SignLevelUpgradeOrderModal } from 'shared';
import { useSmartContractAction } from 'features';
import { message } from 'antd';
import { ContractDto, signOrder } from 'entities/smartcontract';

type Props = {
    contract: ContractDto;
    accountName: string;
};

export const SignLevelUpgradeOrder: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const [signLevelUpgradeOrderModalOpen, setSignLevelUpgradeOrderModalOpen] =
        useState(false);

    const isEngineerOrder = !contract.client;

    const signOrderAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            contractId: contract.id,
        }),
        onSignSuccess: () =>
            message.success(
                t('pages.serviceMarket.contract.successfullySigned')
            ),
    });

    const onSign = async () => {
        if (!isEngineerOrder) {
            await signOrderAction();
            return;
        }

        if (isEngineerOrder) {
            setSignLevelUpgradeOrderModalOpen(true);
        }
    };

    return (
        <>
            <Button onClick={onSign} type="primary" size="large" block>
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
                }}
            />
        </>
    );
};
