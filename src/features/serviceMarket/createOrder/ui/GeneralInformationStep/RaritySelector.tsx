import { Card, Form } from 'antd';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { orderFields } from 'entities/order';

import { raritiesTranslationMap } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { rarityList } from './constants';

export const RaritySelector = () => {
    const { t } = useTranslation();

    return (
        <Form.Item
            className={styles.formField}
            label={t('pages.serviceMarket.createOrder.mineRarity')}
            name={orderFields.optRarity}
            tooltip={
                <Card
                    title={t('pages.serviceMarket.createOrder.mineRarity')}
                    className={styles.tooltipCard}
                >
                    {t('pages.serviceMarket.createOrder.mineRarityDescription')}
                </Card>
            }
        >
            <Select
                disabled
                placeholder={t('pages.serviceMarket.createOrder.mineRarity')}
                options={rarityList.map((rarity) => ({
                    value: rarity,
                    label: t(raritiesTranslationMap[rarity]),
                }))}
                allowClear
            />
        </Form.Item>
    );
};
