import React, { FC } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    DiscordIcon,
    KeyValueTable,
    Page,
    secondsToDate,
    secondsToDays,
    secondsToHour,
    Title,
    useAccountName,
} from 'shared';
import { ContractsGate, contractsStore, Penalty } from 'features';
import { ContractStatus } from 'entities/smartcontract';

import styles from './styles.module.scss';

interface TableProps {
    title: string;
    data: Record<string, string | React.ReactNode>;
}

const TableWithTitle: FC<TableProps> = ({ title, data }) => {
    return (
        <div className={styles.table}>
            <Title fontFamily="orbitron" level={5} className={styles.title}>
                {title}
            </Title>
            <KeyValueTable items={data} />
        </div>
    );
};

export const MineOperationContractPage = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    useGate(ContractsGate, { searchParam: accountName });
    const contracts = useStore(contractsStore);
    const contract = contracts?.filter((v) => v.executor === accountName)?.[0];
    const contractId = contract?.id;

    const handleCopy = (data: string) => () => {
        navigator.clipboard.writeText(data);
    };
    const handleOpenDiscord = () => {
        window.open('https://discord.com/');
    };

    const infoData = {
        title: t('pages.serviceMarket.contract.generalInformation'),
        table: {
            [t('pages.serviceMarket.contract.id')]: (
                <div className={styles.contractId}>
                    {contractId && (
                        <CopyOutlined onClick={handleCopy(`${contractId}`)} />
                    )}
                    <div>{contractId ?? '-'}</div>
                </div>
            ),
            [t('pages.serviceMarket.contract.date')]: contract
                ? secondsToDate(contract.create_time)
                : '-',
            [t('pages.serviceMarket.contract.duration')]: contract
                ? `${secondsToDays(
                      contract.finishes_at - contract.create_time
                  )} days`
                : '-',
        },
    };

    const operationStartsIn = contract?.start_time
        ? contract.start_time * 1000 - Date.now()
        : undefined;

    const conditionsData = {
        title: t('pages.serviceMarket.contract.conditions'),
        table: {
            [t('pages.serviceMarket.contract.operationStart')]:
                operationStartsIn
                    ? Math.max(secondsToHour(operationStartsIn / 1000), 0)
                    : '-',
            [t('pages.serviceMarket.contract.penalty')]: contract
                ? `${contract.penalty_amount} DME`
                : '-',
            [t('pages.serviceMarket.contract.miningTerms')]: '-',
            [t('pages.serviceMarket.contract.fee')]: contract
                ? `${contract.fee_percent} %`
                : '-',
        },
    };

    const landlordData = {
        title: t('pages.serviceMarket.contract.landlord'),
        table: {
            [t('pages.serviceMarket.contract.wallet')]: '-',
            [t('pages.serviceMarket.contract.landlord')]: contract?.executor ? (
                <div className={styles.discord}>
                    <DiscordIcon onClick={handleOpenDiscord} />
                    <div>{contract?.executor}</div>
                </div>
            ) : (
                '-'
            ),
            [t('pages.serviceMarket.contract.area')]: '-',
        },
    };

    const mineOwnerData = {
        title: t('pages.serviceMarket.contract.mineOwner'),
        table: {
            [t('pages.serviceMarket.contract.wallet')]: '-',
            [t('pages.serviceMarket.contract.mineOwner')]: contract?.client ? (
                <div className={styles.discord}>
                    <DiscordIcon />
                    <div>{contract.client}</div>
                </div>
            ) : (
                '-'
            ),
            [t('pages.serviceMarket.contract.mine')]: '-',
        },
    };

    return (
        <Page
            headerTitle={t('pages.serviceMarket.contract.title').toUpperCase()}
        >
            <div className={styles.generalSection}>
                <div className={styles.table}>
                    <TableWithTitle
                        title={infoData.title}
                        data={infoData.table}
                    />
                    {contract?.status === ContractStatus.terminated && (
                        <Penalty contractId={contract.id} />
                    )}
                </div>
                <TableWithTitle
                    title={conditionsData.title}
                    data={conditionsData.table}
                />
            </div>
            <div className={styles.additionalSection}>
                <TableWithTitle
                    title={landlordData.title}
                    data={landlordData.table}
                />
                <TableWithTitle
                    title={mineOwnerData.title}
                    data={mineOwnerData.table}
                />
            </div>
        </Page>
    );
};
