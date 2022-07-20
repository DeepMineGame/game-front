import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { Order } from 'features';
import { ContractDto, ContractType } from 'entities/smartcontract';

type Props = { contract: ContractDto; accountName: string };

export const OrderPage: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const isMiningContract =
        contract.type === ContractType.mineowner_contractor;

    return (
        <Page
            headerTitle={t(
                isMiningContract
                    ? 'pages.serviceMarket.miningOrder'
                    : 'pages.serviceMarket.mineOperationOrder'
            ).toUpperCase()}
        >
            <Order contract={contract} accountName={accountName} />
        </Page>
    );
};
