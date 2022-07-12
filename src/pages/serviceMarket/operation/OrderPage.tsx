import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { Order } from 'features';
import { ContractDto } from 'entities/smartcontract';

type Props = { contract: ContractDto; accountName: string };

export const OrderPage: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    return (
        <Page headerTitle={t('pages.serviceMarket.order.title').toUpperCase()}>
            <Order contract={contract} accountName={accountName} />
        </Page>
    );
};
