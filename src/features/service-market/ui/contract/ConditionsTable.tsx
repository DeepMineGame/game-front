import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'antd';
import { ContractDto } from 'entities/smartcontract';
import { DAY_IN_SECONDS, secondsToTime, msToSeconds } from 'shared/ui';
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

        [t('pages.serviceMarket.contract.fee')]: `${contract.fee_percent}%`,
        [t('Deposit')]: `${contract.deposit}`,
        [t('Auto-renewal')]: <Switch checked={contract.autorenew_enabled} />,
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.conditions')}
            data={conditionData}
        />
    );
};

export { ConditionTable };
