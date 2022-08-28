import { Form } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { Button, Select } from 'shared';
import { orderFields } from 'entities/order';

import {
    $hasActiveInventory,
    $hasEngineerCertificate,
    InventoryGate,
    Role,
} from '../../models';
import styles from '../../styles.module.scss';
import { PersonalizedOrderCheckbox } from '../PersonalizedOrderCheckbox';
import { TypeStepProps } from './interface';

const { useWatch } = Form;

export const LevelUpgrade: FC<TypeStepProps> = ({
    form,
    goToNextStep,
    accountName,
}) => {
    useGate(InventoryGate, { searchParam: accountName });
    const hasActiveInventory = useStore($hasActiveInventory);
    const hasEngineerCertificate = useStore($hasEngineerCertificate);

    const { t } = useTranslation();
    const contractType = useWatch(orderFields.contractType, form);
    const role: Role = useWatch(orderFields.isClient, form);
    const canGoNext = contractType !== undefined && role !== undefined;

    return (
        <>
            <Form.Item
                className={styles.formField}
                label={t('pages.serviceMarket.yourRole')}
                name={orderFields.isClient}
                dependencies={[orderFields.contractType]}
            >
                <Select
                    placeholder={t(
                        'pages.serviceMarket.createOrder.selectRole'
                    )}
                    options={[
                        {
                            value: Role.engineer,
                            label: t('roles.engineer'),
                            disabled: !hasEngineerCertificate,
                        },
                        {
                            value: Role.citizen,
                            label: t('roles.citizen'),
                            disabled: !hasActiveInventory,
                        },
                    ]}
                    onSelect={(value: Role) => {
                        form.resetFields();
                        form.setFieldsValue({
                            [orderFields.contractType]: contractType,
                            [orderFields.isClient]: value,
                        });
                    }}
                />
            </Form.Item>
            <PersonalizedOrderCheckbox isSelfClient={!role} form={form} />
            <Button
                disabled={!canGoNext}
                type="primary"
                onClick={goToNextStep}
                block
            >
                {t('components.common.button.next')}
            </Button>
        </>
    );
};
