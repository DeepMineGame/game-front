import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShareAltOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useContractType } from 'entities/contract';
import { secondsToDays, Text, toLocaleDate } from 'shared/ui';
import { ContractState, TableWithTitle } from '..';
import { ContractProps } from '../../types';
import styles from './styles.module.scss';

const GeneralDataTable: FC<ContractProps> = ({ contract, accountName }) => {
    const { t } = useTranslation();
    const { isOrder } = useContractType(contract);

    const generalData = {
        [t(
            isOrder
                ? 'pages.serviceMarket.order.orderId'
                : 'pages.serviceMarket.contract.contractId'
        )]: (
            <Tooltip trigger="click" overlay={t('pages.info.copied')}>
                <div className={styles.contractId}>
                    <Text className={styles.contractNumber}>{contract.id}</Text>
                    <ShareAltOutlined
                        className={styles.copyIcon}
                        onClick={() =>
                            navigator.clipboard.writeText(window.location.href)
                        }
                    />
                </div>
            </Tooltip>
        ),
        ...(!isOrder && {
            [t('pages.serviceMarket.status')]: (
                <ContractState contract={contract} accountName={accountName} />
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
