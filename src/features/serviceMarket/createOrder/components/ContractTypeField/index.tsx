import { Form, FormInstance } from 'antd';
import React, { FC } from 'react';
import { Select } from 'shared';
import { ContractType, createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

export const ContractTypeField: FC<{ form: FormInstance }> = ({ form }) => {
    return (
        <Form.Item
            className={styles.formField}
            label="Contract type"
            name={createContrFormFields.contractType}
        >
            <Select
                placeholder="Select contract type"
                onSelect={(value: ContractType) =>
                    // reset form and set only current field
                    form.setFieldsValue({
                        [createContrFormFields.contractType]: value,
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
