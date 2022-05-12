import React, { FC, useState } from 'react';
import { CardHolder, Inventory, Card, Button, Page } from 'shared';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { EquipmentInstallationModal } from './components/EquipmentInstallationModal';

export const EquipmentSetPage: FC = () => {
    const { t } = useTranslation();
    const [inventoryVisibility, setInventoryVisibility] = useState(false);
    const toggleInventoryVisibility = () =>
        setInventoryVisibility(!inventoryVisibility);
    return (
        <Page headerTitle={t('pages.equipmentSet')}>
            <div className={styles.cards}>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>
                        <Card initial={10} current={3} remained={7} />
                    </div>

                    <Button
                        className={styles.removeButton}
                        size="large"
                        type="link"
                    >
                        Remove
                    </Button>
                </div>
                <Card initial={20} current={3} remained={10} />
                <Card initial={25} current={15} remained={20} />
                <CardHolder onClick={toggleInventoryVisibility} />
                <CardHolder onClick={toggleInventoryVisibility} />
                <CardHolder onClick={toggleInventoryVisibility} />
                <CardHolder onClick={toggleInventoryVisibility} />
            </div>
            <div className={styles.installButtonWrapper}>
                <EquipmentInstallationModal />
            </div>
            <Inventory
                visible={inventoryVisibility}
                onCancel={toggleInventoryVisibility}
            />
        </Page>
    );
};
