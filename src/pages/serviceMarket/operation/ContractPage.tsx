import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { Contract } from 'features';
import { ContractDto, ContractType } from 'entities/smartcontract';

type Props = { contract: ContractDto; accountName: string };

export const ContractPage: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const miningContract = contract.type === ContractType.mineowner_contractor;

    return (
        <Page
            headerTitle={t(
                miningContract
                    ? 'pages.serviceMarket.miningOrder'
                    : 'pages.serviceMarket.mineOperationContract'
            ).toUpperCase()}
        >
            <Contract contract={contract} accountName={accountName} />
        </Page>
    );
};
