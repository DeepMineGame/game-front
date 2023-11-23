import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, useAccountName } from 'shared';
import { EquipmentTypes } from 'entities/game-stat';
import { getUserStorageAssets, resetStorage } from '../../model';

export const TypeFilter = () => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const options = useMemo(() => {
        return Object.values(EquipmentTypes).map((type) => ({
            value: type,
            label: type.replace('_', ' '),
        }));
    }, []);

    return (
        <Select
            placeholder={t('components.common.selectByName')}
            size="large"
            options={options}
            onChange={async (type: typeof EquipmentTypes) => {
                await resetStorage();
                getUserStorageAssets({
                    searchParam: accountName,
                    inventory_type: type,
                });
            }}
            style={{ minWidth: 200 }}
            allowClear
        />
    );
};
