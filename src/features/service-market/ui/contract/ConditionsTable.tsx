import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal as ModalAnt, Switch } from 'antd';
import { getDmeAmount, useAccountName, useReloadPage } from 'shared';
import { useSmartContractAction } from 'features';
import { ContractDto, disautorenew } from 'entities/smartcontract';
import { TableWithTitle } from '..';

type Props = {
    contract: ContractDto;
};

const ConditionTable: FC<Props> = ({ contract }) => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    // const workDuration = Date.now() - contract.start_time * 1000;
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
    // const shouldDisplayStartOperationIn =
    //     contract.type === ContractType.level_upgrade;

    const conditionData = {
        // ...(shouldDisplayStartOperationIn && contract.deadline_time
        //     ? {
        //           [t('pages.serviceMarket.contract.operationStart')]:
        //               isUtcDateExpired(contract.deadline_time)
        //                   ? 'Expired'
        //                   : getTimeLeft(
        //                         getNowInSeconds() - contract.deadline_time
        //                     ),
        //       }
        //     : {}),

        [t('pages.serviceMarket.contract.fee')]: `${contract.fee_percent}%`,
        [t('Minimum Fee')]: getDmeAmount(contract.deposit),
        [t('Auto-renewal')]: (
            <Switch
                onClick={autoRenewOff}
                checked={contract.autorenew_enabled}
            />
        ),
        [t('Fee paid')]: getDmeAmount(contract.fee_counter),
    };

    return <TableWithTitle title={t('Conditions')} data={conditionData} />;
};

export { ConditionTable };
