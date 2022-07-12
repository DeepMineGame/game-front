import React, { FC } from 'react';
import { FormInstance } from 'antd';
import { Button, useAccountName } from 'shared';
import { useTranslation } from 'react-i18next';
import { useWatch } from 'antd/es/form/Form';
import {
    areasAssetTemplateId,
    createContrFormFields,
    mineAssetTemplateId,
} from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { ContractTypeField } from '../ContractTypeField';
import { RoleField } from '../RoleField';
import { AssetSelectField } from '../AreaSelectField';

export const ContractTypeAndRoleStep: FC<{
    form: FormInstance;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ form, setStep }) => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    const isClientField = useWatch(createContrFormFields.isClient, form);

    const contractType = useWatch(createContrFormFields.contractType, form);
    const hasValueToGoNextStep = contractType && isClientField !== undefined;
    const assetSelect = accountName ? (
        <div>
            {isClientField ? (
                <AssetSelectField
                    templatesId={areasAssetTemplateId}
                    form={form}
                    accountName={accountName}
                />
            ) : (
                <AssetSelectField
                    templatesId={[mineAssetTemplateId]}
                    form={form}
                    accountName={accountName}
                />
            )}
        </div>
    ) : null;
    return (
        <div className={styles.rightSection}>
            <ContractTypeField form={form} />
            <RoleField form={form} />
            {assetSelect}
            <Button
                disabled={!hasValueToGoNextStep}
                block
                type="primary"
                onClick={() => setStep(1)}
            >
                {t('components.common.button.next')}
            </Button>
        </div>
    );
};
