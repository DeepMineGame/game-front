import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';
import { TableWithTitle } from '../..';

type Props = {
    contract: ContractDto;
};

const Conditions: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    const isCitizen = false;

    // todo: use dynamic values
    const conditionData = {
        [t('pages.serviceMarket.upgrade')]: 'Mine, rare, level 3',
        [t('pages.serviceMarket.startOperations')]: '12h',
        [t('pages.serviceMarket.costOfExecution')]: `1 ${t(
            'components.common.button.dme'
        )}`,
        [t('pages.serviceMarket.contract.penalty')]: `${
            contract.penalty_amount
        } ${t('components.common.button.dme')}`,
        // todo: fix
        // @ts-ignore
        ...(isCitizen && {
            [t('pages.serviceMarket.insurance')]: `0.2 ${t(
                'components.common.button.dme'
            )}`,
            [t('pages.serviceMarket.duration')]: `2 ${t(
                'components.common.days'
            ).toLowerCase()}`,
        }),
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.conditions')}
            data={conditionData}
        />
    );
};

export { Conditions };
