import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ContractDto } from 'entities/smartcontract';
import { DAY_IN_SECONDS, secondsToTime, msToSeconds } from 'shared/ui';
import { getDmeAmount } from 'shared/lib/utils';
import { TableWithTitle } from '..';

type Props = {
    contract: ContractDto;
};

const ConditionTable: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();
    const workDuration = Date.now() - contract.start_time * 1000;

    const conditionData = {
        [t('pages.serviceMarket.contract.operationStart')]: contract.start_time
            ? `${Math.floor(
                  msToSeconds(workDuration) / DAY_IN_SECONDS
              )}d ${secondsToTime(msToSeconds(workDuration))}`
            : '-',
        [t('pages.serviceMarket.contract.penalty')]: `${getDmeAmount(
            contract.penalty_amount
        )} ${t('components.common.button.dme')}`,
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
