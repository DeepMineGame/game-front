import React, { FC, useState } from 'react';
import { CardHolder, Header, Inventory } from 'shared';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const EquipmentSetPage: FC = () => {
    const { t } = useTranslation();
    const [inventoryVisibility, setInventoryVisibility] = useState(false);
    const toggleInventoryVisibility = () =>
        setInventoryVisibility(!inventoryVisibility);
    return (
        <div className={styles.wrapper}>
            <Header title={t('pages.equipmentSet')} />
            <div className={styles.content}>
                <CardHolder onClick={toggleInventoryVisibility} />
            </div>
            <Inventory
                visible={inventoryVisibility}
                onCancel={toggleInventoryVisibility}
            />
        </div>
    );
};
