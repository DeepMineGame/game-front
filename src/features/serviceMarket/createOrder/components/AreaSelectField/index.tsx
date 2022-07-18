import React, { FC } from 'react';
import { useWatch } from 'antd/es/form/Form';
import { FormInstance, Form, Alert } from 'antd';
import { useGate, useStore } from 'effector-react';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { ContractType, createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { InventoryGate, userInventoryStore } from './model';

export const AssetSelectField: FC<{
    form: FormInstance;
    accountName: string;
    templatesId: number[];
}> = ({ form, accountName, templatesId }) => {
    useGate(InventoryGate, { searchParam: accountName });
    const { t } = useTranslation();
    const isClientField = useWatch(createContrFormFields.isClient, form);

    const userInventory = useStore(userInventoryStore);
    const assetsFilteredByTemplates = userInventory?.filter(({ template_id }) =>
        templatesId.includes(template_id)
    );
    const contractType = useWatch(createContrFormFields.contractType, form);

    const isMineSetupContractTypeSelected =
        contractType === ContractType.landlord_mineowner;
    const isMineOwnerRoleSelected =
        contractType === ContractType.mineowner_contractor && isClientField;

    if (
        (isMineOwnerRoleSelected || isMineSetupContractTypeSelected) &&
        isClientField !== undefined
    ) {
        return assetsFilteredByTemplates?.length ? (
            <Form.Item
                className={styles.formField}
                label={
                    !isMineOwnerRoleSelected && isClientField
                        ? t('components.common.area')
                        : t('features.actions.mine')
                }
                name={createContrFormFields.assetId}
            >
                <Select
                    placeholder={
                        !isMineOwnerRoleSelected && isClientField
                            ? t('components.common.area')
                            : t('features.actions.mine')
                    }
                    options={assetsFilteredByTemplates.map(({ asset_id }) => ({
                        value: asset_id,
                        label: asset_id,
                    }))}
                />
            </Form.Item>
        ) : (
            <Form.Item>
                <Alert
                    message={t('components.common.warning')}
                    description={t(
                        'pages.serviceMarket.createOrder.haveNoNftAlert.haveNo'
                    )}
                    type="warning"
                    showIcon
                />
            </Form.Item>
        );
    }
    return null;
};
