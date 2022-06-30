import React, { FC } from 'react';
import { useWatch } from 'antd/es/form/Form';
import { FormInstance, Form, Alert } from 'antd';
import { useGate, useStore } from 'effector-react';
import { Select } from 'shared';
import { ContractType, mineAssetTemplateId } from 'entities/smartcontract';
import { fieldNames } from '../../constants';
import styles from '../../styles.module.scss';
import { MineSelectGate, userInventoryStore } from './model';

export const MineSelectField: FC<{
    form: FormInstance;
    accountName: string;
}> = ({ form, accountName }) => {
    useGate(MineSelectGate, { searchParam: accountName });
    const userInventory = useStore(userInventoryStore);
    const userMines = userInventory?.filter(
        ({ template_id }) => template_id === mineAssetTemplateId
    );
    const isClient = useWatch(fieldNames.isClient, form);
    const contractType = useWatch(fieldNames.contractType, form);

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
                label="Contract type"
                name={fieldNames.assetId}
            >
                <Select
                    placeholder="Mine"
                    options={userMines.map(({ asset_id }) => ({
                        value: asset_id,
                        label: asset_id,
                    }))}
                />
            </Form.Item>
        ) : (
            <Alert
                message="Warning"
                description="You don’t have an NFT to create this order. Please visit the Marketplace"
                type="warning"
                showIcon
            />
        );
    }
    return null;
};
