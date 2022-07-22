import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CopyOutlined } from '@ant-design/icons';
import { ContractDto, ContractStatus } from 'entities/smartcontract';
import { secondsToDays, Text, toLocaleDate } from 'shared/ui';
import { TableWithTitle } from '../../ui';
import styles from '../styles.module.scss';

type Props = {
    contract: ContractDto;
};

const GeneralDataTable: FC<Props> = ({ contract }) => {
    const { t } = useTranslation();

    const isOrder =
        contract.status === ContractStatus.signed_by_client ||
        contract.status === ContractStatus.signed_by_executor;

    const generalData = {
        [t(
            isOrder
                ? 'pages.serviceMarket.order.orderId'
                : 'pages.serviceMarket.contract.contractId'
        )]: (
            <>
                <CopyOutlined
                    className={styles.copyIcon}
                    onClick={() =>
                        navigator.clipboard.writeText(`${contract.id}`)
                    }
                />
                <Text className={styles.accent}>{contract.id}</Text>
            </>
        ),
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
