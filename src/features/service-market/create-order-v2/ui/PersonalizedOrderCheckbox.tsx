import { Checkbox, Input } from 'shared';
import { Form, FormInstance, Space } from 'antd';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { orderFields } from 'entities/order';

import styles from '../styles.module.scss';

export const PersonalizedOrderCheckbox: FC<{
    form: FormInstance;
    isSelfClient: boolean;
}> = ({ form, isSelfClient }) => {
    const [isPersonalizedOrder, setIsPersonalizedOrder] = useState(false);
    const { t } = useTranslation();

    const handleChange = useCallback(
        (event) => {
            if (!event.target.checked) {
                form.setFieldsValue({
                    ...form.getFieldsValue(),
                    [orderFields.optClient]: null,
                    [orderFields.optExecutor]: null,
                });
            }
            setIsPersonalizedOrder(event.target.checked);
        },
        [form]
    );

    return (
        <Space direction="vertical" size="large">
            <Checkbox onChange={handleChange}>
                {t('pages.serviceMarket.createOrder.personalOrder')}
            </Checkbox>
            {isPersonalizedOrder ? (
                <Form.Item
                    label={
                        isSelfClient
                            ? t('components.common.client')
                            : t('components.common.executor')
                    }
                    className={styles.formField}
                    name={
                        isSelfClient
                            ? orderFields.optClient
                            : orderFields.optExecutor
                    }
                >
                    <Input />
                </Form.Item>
            ) : (
                <div />
            )}
        </Space>
    );
};
