import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal as ModalAnt, Switch } from 'antd';
import { getDmeAmount, useAccountName, useReloadPage } from 'shared';
import { useSmartContractAction } from 'features';
import { ContractDto, disautorenew } from 'entities/smartcontract';
import { DAY_IN_SECONDS, secondsToTime, msToSeconds } from 'shared/ui';
import { TableWithTitle } from '..';

type Props = {
    contract: ContractDto;
};

const ConditionTable: FC<Props> = ({ contract }) => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    const workDuration = Date.now() - contract.start_time * 1000;
    const reloadPage = useReloadPage();

    const disableAutoRenew = useSmartContractAction({
        action: disautorenew({
            waxUser: accountName,
            contractId: contract?.id,
        }),
    });

    const autoRenewOff = useCallback(async () => {
        if (contract.autorenew_enabled) {
            disableAutoRenew().then(() =>
                ModalAnt.success({
                    title: t('Auto-renewal'),
                    content: t('Auto-renewal disabled'),
                    onOk: reloadPage,
                })
            );
        }
    }, [contract.autorenew_enabled, disableAutoRenew, reloadPage, t]);

    const conditionData = {
        [t('pages.serviceMarket.contract.operationStart')]: contract.start_time
            ? `${Math.floor(
                  msToSeconds(workDuration) / DAY_IN_SECONDS
              )}d ${secondsToTime(msToSeconds(workDuration))}`
            : '-',

        [t('pages.serviceMarket.contract.fee')]: `${contract.fee_percent}%`,
        [t('Deposit')]: getDmeAmount(contract.deposit),
        [t('Auto-renewal')]: (
            <Switch
                onClick={autoRenewOff}
                checked={contract.autorenew_enabled}
            />
        ),
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.conditions')}
            data={conditionData}
        />
    );
};

export { ConditionTable };
