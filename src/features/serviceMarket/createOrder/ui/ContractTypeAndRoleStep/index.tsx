import React, { FC } from 'react';
import { Form, FormInstance } from 'antd';
import { Button } from 'shared';
import { useTranslation } from 'react-i18next';
import { useGate } from 'effector-react';
import {
    areasAssetTemplateId,
    ContractType,
    createContrFormFields,
    mineAssetTemplateId,
} from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { ContractTypeField } from '../ContractTypeField';
import { LandLordMineOwnerRoleField } from '../LandLordMineOwnerRoleField';
import { AssetSelectField } from '../AssetSelectField';
import { CreateOrderGate } from '../../models';
import { MineOwnerContractorRoleField } from '../MineOwnerContractorRoleField';

const { useWatch } = Form;

export const ContractTypeAndRoleStep: FC<{
    form: FormInstance;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    accountName: string;
}> = ({ form, setStep, accountName }) => {
    useGate(CreateOrderGate, { searchParam: accountName });
    const { t } = useTranslation();
    const isClientField = useWatch(createContrFormFields.isClient, form);
    const contractType = useWatch(createContrFormFields.contractType, form);
    const isMiningContract = contractType === ContractType.mineowner_contractor;

    const hasValueToGoNextStep = contractType && isClientField !== undefined;
    const assetSelect = accountName ? (
        <div>
            {isClientField && !isMiningContract ? (
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
            {contractType === ContractType.landlord_mineowner ? (
                <LandLordMineOwnerRoleField form={form} />
            ) : (
                <MineOwnerContractorRoleField form={form} />
            )}
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
