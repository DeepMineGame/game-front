import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, showSuccessModal, useReloadPage } from 'shared';
import { useSmartContractAction } from 'features/hooks';
import { ContractDto, signOrder } from 'entities/smartcontract';

type Props = {
    contract: ContractDto;
    accountName: string;
    isSelfContract: boolean;
};

const SignMineOwnerContractorOrder: FC<Props> = React.memo(
    ({ contract, accountName, isSelfContract }) => {
        const { t } = useTranslation();
        const reloadPage = useReloadPage();

        const signContractAction = useSmartContractAction({
            action: signOrder({
                waxUser: accountName,
                assetId: contract.client_asset_id,
                contractId: contract.id,
                ...(isSelfContract && { isClient: 0 }),
            }),
        });

        const handleSignOrder = useCallback(async () => {
            await signContractAction();
            showSuccessModal({
                title: t('pages.serviceMarket.order.signOrder'),
                content: t('pages.serviceMarket.order.orderCreated'),
                onOk: reloadPage,
            });
        }, [reloadPage, signContractAction, t]);

        return (
            <Button onClick={handleSignOrder} size="large" type="primary" block>
                {t('pages.serviceMarket.order.signOrder')}
            </Button>
        );
    }
);

export { SignMineOwnerContractorOrder };
