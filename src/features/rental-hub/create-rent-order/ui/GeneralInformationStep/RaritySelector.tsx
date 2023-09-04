import { Card, Form } from 'antd';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { orderFields } from 'entities/order';

import { raritiesTranslationMap, RarityType } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
// import { rarityList } from './constants';

export const RaritySelector = () => {
    const { t } = useTranslation();

    return (
        <Form.Item
            className={styles.formField}
            label={t('Mine rarity')}
            name={orderFields.optRarity}
            tooltip={
                <Card title={t('Mine rarity')} className={styles.tooltipCard}>
                    {t('pages.serviceMarket.createOrder.mineRarityDescription')}
                </Card>
            }
        >
            <Select
                placeholder="N/A"
                options={
                    // rarityList
                    [RarityType.legendary].map((rarity) => ({
                        value: rarity,
                        label: t(raritiesTranslationMap[rarity]),
                    }))
                }
                allowClear
            />
        </Form.Item>
    );
};
