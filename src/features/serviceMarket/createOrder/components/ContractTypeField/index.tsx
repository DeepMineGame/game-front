import { Form } from 'antd';
import React from 'react';
import { useForm } from 'antd/es/form/Form';
import { Select } from 'shared';
import { ContractType } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

export const ContractTypeField = () => {
    const [form] = useForm();
    return (
        <Form.Item
            className={styles.formField}
            label="Contract type"
            name="contract_type"
        >
            <Select
                placeholder="Select contract type"
                onChange={({ value }) =>
                    form.setFieldsValue({
                        ...form.getFieldsValue(),
                        contract_type: value,
                    })
                }
                options={[
                    {
                        value: ContractType.landlord_mineowner,
                        label: 'Mine setup',
                    },
                    {
                        value: ContractType.mineowner_contractor,
                        label: 'Mining contract',
                    },
                ]}
            />
        </Form.Item>
    );
};
