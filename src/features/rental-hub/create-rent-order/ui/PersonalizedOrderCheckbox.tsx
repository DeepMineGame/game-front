import { Checkbox, Input, useAccountName } from 'shared';
import { Form, FormInstance, Space } from 'antd';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ValidateStatus } from 'antd/es/form/FormItem';
import { rentOrderField } from 'entities/smartcontract';
import styles from '../styles.module.scss';

export const PersonalizedOrderCheckbox: FC<{
    form: FormInstance;
}> = ({ form }) => {
    const [isPersonalizedOrder, setIsPersonalizedOrder] = useState(false);
    const { t } = useTranslation();
    const accountName = useAccountName();
    const [inputMeta, setInputMeta] = useState<{
        value: string;
        validateStatus?: ValidateStatus;
        errorMsg?: string | null;
    }>({ value: '' });
    const handleChange = useCallback(
        (event) => {
            if (!event.target.checked) {
                form.setFieldsValue({
                    ...form.getFieldsValue(),
                    [rentOrderField.opt_renter]: null,
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
                    label={t('components.common.client')}
                    className={styles.formField}
                    name={rentOrderField.opt_renter}
                    validateStatus={inputMeta.validateStatus}
                    help={inputMeta.errorMsg}
                >
                    <Input
                        onChange={(e) => {
                            if (accountName === e.target.value) {
                                return setInputMeta({
                                    value: e.target.value,
                                    errorMsg: 'Can not assign to yourself',
                                    validateStatus: 'error',
                                });
                            }
                            setInputMeta({ value: e.target.value });
                        }}
                    />
                </Form.Item>
            ) : (
                <div />
            )}
        </Space>
    );
};
