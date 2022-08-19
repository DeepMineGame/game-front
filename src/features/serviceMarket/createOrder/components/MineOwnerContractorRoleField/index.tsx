import { Form, FormInstance } from 'antd';
import React, { FC } from 'react';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

const { useWatch } = Form;
const CLIENT = 1;
const NOT_CLIENT = 0;

export const MineOwnerContractorRoleField: FC<{ form: FormInstance }> = ({
    form,
}) => {
    const { t } = useTranslation();
    const contractType = useWatch(createContrFormFields.contractType, form);
    const isDisabled = contractType === undefined;

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
                        value: CLIENT,
                        label: t('roles.mineOwner'),
                    },
                    {
                        value: NOT_CLIENT,
                        label: t('roles.contractor'),
                    },
                ]}
            />
        </Form.Item>
    );
};
