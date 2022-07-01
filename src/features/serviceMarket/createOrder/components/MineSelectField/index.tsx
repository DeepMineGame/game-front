import React, { FC } from 'react';
import { useWatch } from 'antd/es/form/Form';
import { FormInstance, Form, Alert } from 'antd';
import { useGate, useStore } from 'effector-react';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import {
    ContractType,
    createContrFormFields,
    mineAssetTemplateId,
} from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { MineSelectGate, userInventoryStore } from './model';

export const MineSelectField: FC<{
    form: FormInstance;
    accountName: string;
}> = ({ form, accountName }) => {
    useGate(MineSelectGate, { searchParam: accountName });
    const { t } = useTranslation();

    const userInventory = useStore(userInventoryStore);
    const userMines = userInventory?.filter(
        ({ template_id }) => template_id === mineAssetTemplateId
    );
    const isClient = useWatch(createContrFormFields.isClient, form);
    const contractType = useWatch(createContrFormFields.contractType, form);

    const isMineSetupContractTypeSelected =
        contractType === ContractType.landlord_mineowner;

    if (
        isMineSetupContractTypeSelected &&
        !isClient &&
        isClient !== undefined
    ) {
        return userMines?.length ? (
            <Form.Item
                className={styles.formField}
                label={t('features.actions.mine')}
                name={createContrFormFields.assetId}
            >
                <Select
                    placeholder={t('features.actions.mine')}
                    options={userMines.map(({ asset_id }) => ({
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
