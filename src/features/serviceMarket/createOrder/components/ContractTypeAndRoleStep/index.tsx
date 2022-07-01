import React, { FC } from 'react';
import { FormInstance } from 'antd';
import { Button, useAccountName } from 'shared';
import { useTranslation } from 'react-i18next';
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

    return (
        <div className={styles.rightSection}>
            <ContractTypeField form={form} />
            <RoleField form={form} />
            {accountName && (
                <MineSelectField form={form} accountName={accountName} />
            )}
            <Button block type="primary" onClick={() => setStep(1)}>
                {t('components.common.button.next')}
            </Button>
        </div>
    );
};
