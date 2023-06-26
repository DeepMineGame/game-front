import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShareAltOutlined } from '@ant-design/icons';
import { Progress, Tooltip } from 'antd';
import { useContractType } from 'entities/contract';
import {
    normalizeAttrs,
    raritiesTranslationMap,
    RarityType,
} from 'entities/smartcontract';
import {
    neutral3Color,
    primary6,
    secondsToDays,
    Text,
    toLocaleDate,
} from 'shared/ui';
import { TableWithTitle } from '..';
import { ContractProps } from '../../types';
import styles from './styles.module.scss';

const SUB_LEVELS_MAX_AMOUNT = 5;

const GeneralDataTable: FC<ContractProps> = ({ contract }) => {
    const { t } = useTranslation();
    const { isOrder } = useContractType(contract);
    const subLevel = normalizeAttrs(contract.attrs).mine_sublevel;
    const mineSubLevelToPercent =
        subLevel &&
        Number(subLevel) > 0 &&
        ((Number(subLevel) + 1) / SUB_LEVELS_MAX_AMOUNT) * 100;

    const generalData = {
        [t(isOrder ? 'pages.serviceMarket.order.orderId' : 'Contract ID')]: (
            <div className={styles.contractId}>
                <Text>{contract.id}</Text>
                <Tooltip trigger="click" overlay={t('pages.info.copied')}>
                    <ShareAltOutlined
                        className={styles.copyIcon}
                        onClick={() =>
                            navigator.clipboard.writeText(window.location.href)
                        }
                    />
                </Tooltip>
            </div>
        ),
        [t('pages.serviceMarket.creationDate')]: toLocaleDate(
            contract.create_time * 1000
        ),
        [t('components.common.duration')]: `${secondsToDays(
            contract.contract_duration
        )} ${t('components.common.days').toLowerCase()}`,
        [t('Mine sublevel')]: (
            <Progress
                percent={mineSubLevelToPercent || 25}
                steps={5}
                showInfo={false}
                strokeColor={primary6}
                trailColor={neutral3Color}
            />
        ),
    };

    if (contract.level !== -1) {
        generalData[t('pages.serviceMarket.createOrder.mineLevel')] =
            contract.level.toString();
    }
    if (contract.rarity !== -1) {
        generalData[t('Mine rarity')] = t(
            raritiesTranslationMap[contract.rarity as RarityType]
        );
    }

    return (
        <TableWithTitle title={t('General information')} data={generalData} />
    );
};

export { GeneralDataTable };
