import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared';
import { Contract } from 'features';
import { ContractDto, ContractType } from 'entities/smartcontract';

type Props = { contract: ContractDto; accountName: string };

export const ContractPage: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const isMiningContract =
        contract.type === ContractType.mineowner_contractor;

    return (
        <Page
            headerTitle={t(
                isMiningContract
                    ? 'pages.serviceMarket.miningContract'
                    : 'pages.serviceMarket.mineOperationContract'
            ).toUpperCase()}
        >
            <Contract contract={contract} accountName={accountName} />
        </Page>
    );
};
