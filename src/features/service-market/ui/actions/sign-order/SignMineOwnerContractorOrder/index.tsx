import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, useReloadPage } from 'shared';
import { App } from 'antd';
import { useSmartContractAction } from 'features/hooks';
import { ContractDto, signOrder } from 'entities/smartcontract';

type Props = {
    contract: ContractDto;
    accountName: string;
    isSelfContract: boolean;
};

const SignAsContractor: FC<Props> = React.memo(
    ({ contract, accountName, isSelfContract }) => {
        const { t } = useTranslation();
        const reloadPage = useReloadPage();
        const { modal } = App.useApp();

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
            modal.success({
                title: t('pages.serviceMarket.order.signOrder'),
                content: t('pages.serviceMarket.order.orderCreated'),
                onOk: reloadPage,
            });
        }, [reloadPage, signContractAction, t]);

        return (
            <Button onClick={handleSignOrder} type="primary" block>
                {t('pages.serviceMarket.order.signOrder')}
            </Button>
        );
    }
);

export { SignAsContractor };
