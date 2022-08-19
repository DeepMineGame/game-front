import { Form, FormInstance } from 'antd';
import React, { FC } from 'react';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { ContractType, createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

const { useWatch } = Form;

export const RoleField: FC<{ form: FormInstance }> = ({ form }) => {
    const { t } = useTranslation();

    const contractType = useWatch(createContrFormFields.contractType, form);
    const isDisabled = contractType === undefined;
    const isMineSetupContractTypeSelected =
        contractType === ContractType.landlord_mineowner;

    return (
        <Form.Item
            className={styles.formField}
            label={t('pages.serviceMarket.createOrder.yourRole')}
            name={createContrFormFields.isClient}
            dependencies={[createContrFormFields.contractType]}
        >
            <Select
                disabled={isDisabled}
                placeholder={
                    isDisabled
                        ? t('pages.serviceMarket.createOrder.selectToDisable')
                        : t('pages.serviceMarket.createOrder.selectRole')
                }
                options={[
                    {
                        value: isMineSetupContractTypeSelected ? 1 : 0,
                        label: isMineSetupContractTypeSelected
                            ? t('roles.landlord')
                            : t('roles.contractor'),
                    },
                    {
                        value: isMineSetupContractTypeSelected ? 0 : 1,
                        label: t('roles.mineOwner'),
                    },
                ]}
            />
        </Form.Item>
    );
};
