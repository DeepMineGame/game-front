import React, { FC } from 'react';
import { FormInstance } from 'antd';
import { Button, useAccountName } from 'shared';
import { useTranslation } from 'react-i18next';
import { useWatch } from 'antd/es/form/Form';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { ContractTypeField } from '../ContractTypeField';
import { RoleField } from '../RoleField';
import { MineSelectField } from '../MineSelectField';

export const ContractTypeAndRoleStep: FC<{
    form: FormInstance;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ form, setStep }) => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    const contractType = useWatch(createContrFormFields.contractType, form);
    const isClientField = useWatch(createContrFormFields.isClient, form);
    const hasValueToGoNextStep = contractType && isClientField !== undefined;

    return (
        <div className={styles.rightSection}>
            <ContractTypeField form={form} />
            <RoleField form={form} />
            {accountName && (
                <MineSelectField form={form} accountName={accountName} />
            )}
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
