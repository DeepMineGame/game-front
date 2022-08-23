import { Form, FormInstance, Tooltip } from 'antd';
import React, { FC } from 'react';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { createContrFormFields, ContractRole } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { hasActiveMineOwnerContractorContractAsExecutor } from '../../models/hasActiveMineOwnerContractorContractAsExecutor';
import { hasMineEmptySlotsStore } from '../../models/hasMineEmptySlots';

const { useWatch } = Form;

export const MineOwnerContractorRoleField: FC<{ form: FormInstance }> = ({
    form,
}) => {
    const { t } = useTranslation();
    const contractType = useWatch(createContrFormFields.contractType, form);
    const isDisabled = contractType === undefined;
    const hasActiveContract = useStore(
        hasActiveMineOwnerContractorContractAsExecutor
    );
    const hasMineEmptySlots = useStore(hasMineEmptySlotsStore);
    const hasActiveContractTooltipText =
        hasActiveContract &&
        t('pages.serviceMarket.createOrder.youHaveSignedContract');
    const hasMineEmptySlotsTooltipText =
        !hasMineEmptySlots &&
        t('pages.serviceMarket.createOrder.yourMineIsFull');

    return (
        <Form.Item
            className={styles.formField}
            label={t('pages.serviceMarket.yourRole')}
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
                        value: ContractRole.client,
                        label: (
                            <Tooltip overlay={hasMineEmptySlotsTooltipText}>
                                {t('roles.mineOwner')}
                            </Tooltip>
                        ),
                        disabled: !hasMineEmptySlots,
                    },
                    {
                        value: ContractRole.executor,
                        label: (
                            <Tooltip overlay={hasActiveContractTooltipText}>
                                {t('roles.contractor')}
                            </Tooltip>
                        ),
                        disabled: hasActiveContract,
                    },
                ]}
            />
        </Form.Item>
    );
};
