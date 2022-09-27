import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SignLevelUpgradeOrderModal } from 'shared';
import { useSmartContractAction } from 'features';
import { ContractDto, signOrder } from 'entities/smartcontract';
import { useContractState } from 'entities/contract';

type Props = {
    contract: ContractDto;
    accountName: string;
};

export const SignLevelUpgradeOrder: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const { isExecutor } = useContractState(contract, accountName);
    const [signLevelUpgradeOrderModalOpen, setSignLevelUpgradeOrderModalOpen] =
        useState(false);

    const signOrderAction = useSmartContractAction({
        action: signOrder({
            waxUser: accountName,
            contractId: contract.id,
        }),
    });

    const onSign = async () => {
        if (isExecutor) {
            await signOrderAction();
            console.log('ADD SHOWING MESSAGE COMPONENT');
            return;
        }

        setSignLevelUpgradeOrderModalOpen(true);
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
                    console.log('ADD SHOWING MESSAGE COMPONENT');
                }}
            />
        </>
    );
};
