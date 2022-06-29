import { Form, FormInstance } from 'antd';
import React, { FC } from 'react';
import { Select } from 'shared';
import { useWatch } from 'antd/es/form/Form';
import { ContractType } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { fieldNames } from '../../constants';

export const RoleField: FC<{ form: FormInstance }> = ({ form }) => {
    const contractType = useWatch(fieldNames.contractType, form);
    const isDisabled = !contractType;
    const isMineSetupContractTypeSelected =
        contractType === ContractType.landlord_mineowner;
    return (
        <Form.Item
            className={styles.formField}
            label="Your role"
            name="is_client"
            dependencies={[fieldNames.contractType]}
        >
            <Select
                disabled={isDisabled}
                placeholder={
                    isDisabled
                        ? 'Select contract type to disable'
                        : 'Select role'
                }
                options={[
                    {
                        value: 1,
                        label: 'Contrcator',
                    },
                    {
                        value: 0,
                        label: 'Mine owner',
                    },
                ]}
            />
        </Form.Item>
    );
};
