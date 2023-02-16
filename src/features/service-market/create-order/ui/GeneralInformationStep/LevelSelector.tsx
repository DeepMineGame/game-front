import { Card, Form } from 'antd';
import { getLabelSelectItem, Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { orderFields } from 'entities/order';

import styles from '../../styles.module.scss';

export const LevelSelector = () => {
    const { t } = useTranslation();

    return (
        <Form.Item
            className={styles.formField}
            label={t('pages.serviceMarket.createOrder.mineLevel')}
            name={orderFields.optLevel}
            tooltip={
                <Card
                    title={t('pages.serviceMarket.createOrder.mineLevel')}
                    className={styles.tooltipCard}
                >
                    {t('pages.serviceMarket.createOrder.mineLevelDescription')}
                </Card>
            }
        >
            <Select
                disabled
                placeholder={t('pages.serviceMarket.createOrder.mineLevel')}
                options={getLabelSelectItem({
                    amount: 8,
                    label: '',
                    sinceZero: true,
                })}
                allowClear
            />
        </Form.Item>
    );
};
