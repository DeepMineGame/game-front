import { Form, FormInstance } from 'antd';
import React, { FC } from 'react';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { ContractType, createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

export const ContractTypeField: FC<{ form: FormInstance }> = ({ form }) => {
    const { t } = useTranslation();

    return (
        <Form.Item
            className={styles.formField}
            label={t('pages.serviceMarket.createOrder.contractType')}
            name={createContrFormFields.contractType}
        >
            <Select
                placeholder={t(
                    'pages.serviceMarket.createOrder.selectContractType'
                )}
                onSelect={(value: ContractType) =>
                    // reset form and set only current field
                    form.setFieldsValue({
                        [createContrFormFields.contractType]: value,
                    })
                }
                options={[
                    {
                        value: ContractType.landlord_mineowner,
                        label: t('features.actions.mineSetup'),
                    },
                    {
                        value: ContractType.mineowner_contractor,
                        label: t(
                            'pages.serviceMarket.createOrder.miningContract'
                        ),
                    },
                ]}
            />
        </Form.Item>
    );
};
