import { Form, FormInstance } from 'antd';
import React, { FC } from 'react';
import { Select } from 'shared';
import { useWatch } from 'antd/es/form/Form';
import { ContractType, createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

export const RoleField: FC<{ form: FormInstance }> = ({ form }) => {
    const contractType = useWatch(createContrFormFields.contractType, form);
    const isDisabled = contractType === undefined;
    const isMineSetupContractTypeSelected =
        contractType === ContractType.landlord_mineowner;
    return (
        <Form.Item
            className={styles.formField}
            label="Your role"
            name={createContrFormFields.isClient}
            dependencies={[createContrFormFields.contractType]}
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
                        value: isMineSetupContractTypeSelected ? 1 : 0,
                        label: isMineSetupContractTypeSelected
                            ? 'Land lord'
                            : 'Contrcator',
                    },
                    {
                        value: isMineSetupContractTypeSelected ? 0 : 1,
                        label: 'Mine owner',
                    },
                ]}
            />
        </Form.Item>
    );
};
