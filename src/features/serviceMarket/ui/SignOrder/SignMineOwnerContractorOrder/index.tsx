import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, useReloadPage } from 'shared';
import { useSmartContractAction } from 'features/hooks';
import { ContractDto, signOrder } from 'entities/smartcontract';

type Props = {
    contract: ContractDto;
    accountName: string;
};

const SignMineOwnerContractorOrder: FC<Props> = React.memo(
    ({ contract, accountName }) => {
        const { t } = useTranslation();
        const reloadPage = useReloadPage();

        const signContractAction = useSmartContractAction(
            signOrder({
                waxUser: accountName,
                assetId: contract.client_asset_id,
                contractId: contract.id,
            })
        );

        const handleSignOrder = async () => {
            await signContractAction();
            reloadPage();
        };

        return (
            <Button onClick={handleSignOrder} type="primary">
                {t('pages.serviceMarket.order.signOrder')}
            </Button>
        );
    }
);

export { SignMineOwnerContractorOrder };
