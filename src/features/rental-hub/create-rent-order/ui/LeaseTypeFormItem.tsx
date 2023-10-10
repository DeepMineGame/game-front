import { Form, FormInstance } from 'antd';
import { Select } from 'shared';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { orderFields } from 'entities/order';
import { equipmentSet, rentOrderField } from 'entities/smartcontract';

export enum EquipmentType {
    undefined,
    mine,
    equipment,
    factory,
    module,
    structures,
    areas,
}
export const LeaseTypeFormItem: FC<{
    setSelectedEquipmentSet: any;
    form: FormInstance;
    setAsset: any;
}> = ({ setSelectedEquipmentSet, form, setAsset }) => {
    const { t } = useTranslation();
    const clearSelectedAssets = useCallback(() => {
        setSelectedEquipmentSet({});
        setAsset(undefined);
        form.setFieldValue([rentOrderField.asset_ids], []);
    }, [form, setAsset, setSelectedEquipmentSet]);
    return (
        <Form.Item label={t('Lease item type')} name={orderFields.optSchema}>
            <Select
                placeholder={t('Select type')}
                onSelect={clearSelectedAssets}
                options={[
                    {
                        value: EquipmentType.equipment,
                        label: t(`Equipment`),
                    },

                    {
                        value: EquipmentType.mine,
                        label: t(`Mine`),
                    },
                    {
                        value: equipmentSet,
                        label: t('Equipment set'),
                    },
                    {
                        value: EquipmentType.areas,
                        label: t('Area'),
                    },
                ]}
            />
        </Form.Item>
    );
};

export const useWatchUpgradeType = (form: FormInstance) => {
    const type = Form.useWatch(orderFields.optSchema, form);

    return {
        type: type as EquipmentType,
        hasValue: type !== undefined,
    };
};
