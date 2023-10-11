import { Form, FormInstance, Tooltip } from 'antd';
import { Select } from 'shared';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { orderFields } from 'entities/order';
import { EngineerSchema, equipmentSet } from 'entities/smartcontract';

import styles from '../styles.module.scss';

export const UpgradeTypeFormItem: FC<{
    setSelectedEquipmentSet?: any;
    setAsset?: any;
    form?: FormInstance;
}> = ({ setSelectedEquipmentSet, setAsset, form }) => {
    const { t } = useTranslation();
    const clearSelectedAssets = useCallback(() => {
        setSelectedEquipmentSet?.({});
        setAsset?.(undefined);
        form?.setFieldsValue({
            [orderFields.assetId]: null,
            [orderFields.assetId1]: null,
            [orderFields.assetId2]: null,
            [orderFields.assetId3]: null,
            [orderFields.assetId4]: null,
            [orderFields.assetId5]: null,
        });
    }, [form, setAsset, setSelectedEquipmentSet]);
    return (
        <Form.Item
            className={styles.formField}
            label={t('Upgrade type')}
            name={orderFields.optSchema}
        >
            <Select
                onSelect={clearSelectedAssets}
                placeholder={t('Select type')}
                options={[
                    {
                        value: EngineerSchema.equipment,
                        label: t(
                            `pages.serviceMarket.createOrder.upgradeTypeList.${EngineerSchema.equipment}`
                        ),
                    },
                    {
                        value: EngineerSchema.module,
                        label: (
                            <Tooltip
                                overlay={t('components.common.comingSoon')}
                                placement="right"
                            >
                                {t(
                                    `pages.serviceMarket.createOrder.upgradeTypeList.${EngineerSchema.module}`
                                )}
                            </Tooltip>
                        ),
                        disabled: true,
                    },
                    {
                        value: EngineerSchema.mine,
                        label: t(
                            `pages.serviceMarket.createOrder.upgradeTypeList.${EngineerSchema.mine}`
                        ),
                    },
                    {
                        value: equipmentSet,
                        label: t('Equipment set'),
                    },
                ]}
            />
        </Form.Item>
    );
};

export const useWatchUpgradeType = (form: FormInstance) => {
    const type = Form.useWatch(orderFields.optSchema, form);

    return {
        type: type as EngineerSchema,
        hasValue: type !== undefined,
    };
};
