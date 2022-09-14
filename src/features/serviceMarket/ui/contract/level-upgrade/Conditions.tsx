import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';
import { TableWithTitle } from '../..';

type Props = {
    contract: ContractDto;
};

const Conditions: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    const isCitizen = !!contract.client && !contract.executor;
    const [level, rarity, schema] = contract.attrs;

    // todo: use dynamic values
    const conditionData = {
        [t(
            'pages.serviceMarket.upgrade'
        )]: `${schema?.value}, ${rarity?.value}, level ${level?.value}`,
        [t('pages.serviceMarket.startOperations')]: '12h',
        [t('pages.serviceMarket.costOfExecution')]: `${
            contract.cost_of_execution
        } ${t('components.common.button.dme')}`,
        [t('pages.serviceMarket.contract.penalty')]: `${
            contract.penalty_amount
        } ${t('components.common.button.dme')}`,
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
