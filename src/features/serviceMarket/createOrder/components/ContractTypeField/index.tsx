import { Form } from 'antd';
import React from 'react';
import { Select } from 'shared';
import { ContractType } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { fieldNames } from '../../constants';

export const ContractTypeField = () => {
    return (
        <Form.Item
            className={styles.formField}
            label="Contract type"
            name={fieldNames.contractType}
        >
            <Select
                placeholder="Select contract type"
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
