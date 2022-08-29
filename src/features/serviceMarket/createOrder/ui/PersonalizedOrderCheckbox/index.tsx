import { Checkbox, Input } from 'shared';
import { Form, FormInstance, Space } from 'antd';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

export const PersonalizedOrderCheckbox: FC<{
    form: FormInstance;
    isSelfClient: boolean;
}> = ({ form, isSelfClient }) => {
    const [isPersonalizedOrder, setIsPersonalizedOrder] = useState(false);
    const { t } = useTranslation();
    const onChange = useCallback(
        (e) => {
            if (!e.target.checked) {
                form.setFieldsValue({
                    ...form.getFieldsValue(),
                    [createContrFormFields.optClient]: null,
                    [createContrFormFields.optExecutor]: null,
                });
            }
            setIsPersonalizedOrder(e.target.checked);
        },
        [form]
    );
    return (
        <Space direction="vertical" size="large">
            <Checkbox onChange={onChange}>
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
                            ? createContrFormFields.optClient
                            : createContrFormFields.optExecutor
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
