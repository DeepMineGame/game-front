import { Form, FormInstance } from 'antd';
import { Select } from 'shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { orderFields } from 'entities/order';
import { EngineerSchema, equipmentSet } from 'entities/smartcontract';

export enum EquipmentType {
    undefined,
    mine,
    equipment,
    factory,
    module,
}
export const LeaseTypeFormItem: FC = () => {
    const { t } = useTranslation();

    return (
        <Form.Item label={t('Lease item type')} name={orderFields.optSchema}>
            <Select
                placeholder={t('pages.serviceMarket.createOrder.selectType')}
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
