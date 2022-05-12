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
                        <Card
                            initialProgress={10}
                            progressCurrent={3}
                            progressRemained={7}
                        />
                    </div>

                    <Button
                        className={styles.removeButton}
                        size="large"
                        type="link"
                    >
                        Remove
                    </Button>
                </div>
                <Card
                    initialProgress={20}
                    progressCurrent={3}
                    progressRemained={10}
                />
                <Card
                    initialProgress={25}
                    progressCurrent={15}
                    progressRemained={20}
                />
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
