import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardHolder, Card } from 'shared';
import { InventoryNameType, UserInventoryType } from 'entities/smartcontract';

import styles from './styles.module.scss';

interface Props {
    selectedEquipment: Record<InventoryNameType, UserInventoryType> | {};
    onCardButtonClick: (inventory: UserInventoryType) => void;
    onCardHolderClick: (name: InventoryNameType) => void;
}

export const EquipmentCards = ({
    selectedEquipment,
    onCardButtonClick,
    onCardHolderClick,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.cards}>
            {Object.entries(selectedEquipment).map(([name, inventory]) =>
                inventory ? (
                    <Card
                        templateId={inventory.template_id}
                        key={name}
                        initial={10}
                        current={3}
                        remained={7}
                        buttonText={
                            inventory.in_use
                                ? t('pages.equipmentSet.main.remove')
                                : undefined
                        }
                        onButtonClick={() => onCardButtonClick(inventory)}
                        status={inventory.in_use ? 'installed' : 'notInstalled'}
                    />
                ) : (
                    <CardHolder
                        key={name}
                        onClick={() =>
                            onCardHolderClick(name as InventoryNameType)
                        }
                        name={name}
                    />
                )
            )}
        </div>
    );
};
