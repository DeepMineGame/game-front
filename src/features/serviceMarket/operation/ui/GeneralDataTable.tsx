import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShareAltOutlined } from '@ant-design/icons';
import {
    ContractDto,
    ContractStatus,
    getContractStatus,
} from 'entities/smartcontract';
import { secondsToDays, Text, toLocaleDate } from 'shared/ui';
import { TableWithTitle, ContractState } from '../../ui';
import styles from '../styles.module.scss';

type Props = {
    contract: ContractDto;
    accountName: string;
};

const GeneralDataTable: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const contractStatus = getContractStatus(contract, accountName);

    const isOrder =
        contract.status === ContractStatus.signed_by_client ||
        contract.status === ContractStatus.signed_by_executor;

    const generalData = {
        [t(
            isOrder
                ? 'pages.serviceMarket.order.orderId'
                : 'pages.serviceMarket.contract.contractId'
        )]: (
            <div className={styles.contractId}>
                <Text className={styles.contractNumber}>{contract.id}</Text>
                <ShareAltOutlined
                    className={styles.copyIcon}
                    onClick={() =>
                        navigator.clipboard.writeText(window.location.href)
                    }
                />
            </div>
        ),
        ...(!isOrder && {
            [t('pages.serviceMarket.status')]: (
                <div className={styles.status}>
                    <ContractState contractStatus={contractStatus} />
                </div>
            ),
        }),
        [t('pages.serviceMarket.creationDate')]: toLocaleDate(
            contract.create_time * 1000
        ),
        [t('components.common.duration')]: `${secondsToDays(
            contract.contract_duration
        )} ${t('components.common.days').toLowerCase()}`,
    };

    return (
        <TableWithTitle
            title={t('pages.serviceMarket.contract.generalInformation')}
            data={generalData}
        />
    );
};

export { GeneralDataTable };
