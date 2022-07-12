import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';
import { secondsToHour } from 'shared/ui';
import { TableWithTitle } from '../../ui';

type Props = {
    contract: ContractDto;
};

const ConditionTable: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    const operationStartsIn = contract.start_time
        ? contract.start_time * 1000 - Date.now()
        : undefined;

    const conditionData = {
        [t('pages.serviceMarket.contract.operationStart')]: operationStartsIn
            ? Math.max(secondsToHour(operationStartsIn / 1000), 0)
            : '-',
        [t('pages.serviceMarket.contract.penalty')]: `${
            contract.penalty_amount
        } ${t('components.common.button.dme')}`,
        [t('pages.serviceMarket.contract.miningTerms')]: t(
            'pages.serviceMarket.contract.minimumDmeInDays',
            {
                amount: contract.fee_daily_min_amount,
                penalty: contract.days_for_penalty,
            }
        ),
        [t('pages.serviceMarket.contract.fee')]: `${contract.fee_percent}%`,
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.conditions')}
            data={conditionData}
        />
    );
};

export { ConditionTable };
