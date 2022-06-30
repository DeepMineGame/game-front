import { Form, FormInstance } from 'antd';
import React, { FC } from 'react';
import { Select } from 'shared';
import { ContractType } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { fieldNames } from '../../constants';

export const ContractTypeField: FC<{ form: FormInstance }> = ({ form }) => {
    return (
        <Form.Item
            className={styles.formField}
            label="Contract type"
            name={fieldNames.contractType}
        >
            <Select
                placeholder="Select contract type"
                onSelect={(value: ContractType) =>
                    // reset form and set only current field
                    form.setFieldsValue({ [fieldNames.contractType]: value })
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
