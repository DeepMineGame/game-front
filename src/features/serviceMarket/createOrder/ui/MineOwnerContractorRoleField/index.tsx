import { Form, FormInstance } from 'antd';
import { FC } from 'react';
import { Select, Tooltip } from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { createContrFormFields, ContractRole } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import {
    hasActiveMineOwnerContractorContractAsExecutor,
    hasInstalledEquipmentStore,
    hasMineEmptySlotsStore,
} from '../../models';
import { PersonalizedOrderCheckbox } from '../PersonalizedOrderCheckbox';

const { useWatch } = Form;

export const MineOwnerContractorRoleField: FC<{ form: FormInstance }> = ({
    form,
}) => {
    const isClient = useWatch(createContrFormFields.isClient, form);

    const { t } = useTranslation();
    const contractType = useWatch(createContrFormFields.contractType, form);
    const isDisabled = contractType === undefined;
    const hasActiveContract = useStore(
        hasActiveMineOwnerContractorContractAsExecutor
    );
    const hasMineEmptySlots = useStore(hasMineEmptySlotsStore);
    const hasInstalledEquipment = useStore(hasInstalledEquipmentStore);

    const hasActiveContractTooltipText =
        hasActiveContract &&
        t('pages.serviceMarket.createOrder.youHaveSignedContract');
    const hasMineEmptySlotsTooltipText =
        !hasMineEmptySlots &&
        t('pages.serviceMarket.createOrder.yourMineIsFull');

    const hasInstalledEquipmentTooltipText =
        hasInstalledEquipment &&
        t('pages.serviceMarket.createOrder.removeEquipFirst');

    return (
        <>
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
                            ? t(
                                  'pages.serviceMarket.createOrder.selectToDisable'
                              )
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
                                <Tooltip
                                    overlay={
                                        hasActiveContract
                                            ? hasActiveContractTooltipText
                                            : hasInstalledEquipmentTooltipText
                                    }
                                >
                                    {t('roles.contractor')}
                                </Tooltip>
                            ),
                            disabled:
                                hasActiveContract || hasInstalledEquipment,
                        },
                    ]}
                />
            </Form.Item>
            <PersonalizedOrderCheckbox isSelfClient={isClient} form={form} />
        </>
    );
};
