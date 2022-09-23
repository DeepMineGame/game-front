import { useTranslation } from 'react-i18next';

import { CardHolder, Card, Status } from 'shared';
import { InventoryNameType, UserInventoryType } from 'entities/smartcontract';
import styles from './styles.module.scss';

interface Props {
    selectedEquipment: Record<InventoryNameType, UserInventoryType> | {};
    onCardButtonClick: (inventory: UserInventoryType) => void;
    onCardHolderClick: (name: InventoryNameType) => void;
}

const getCardStatus = (inventory: UserInventoryType): Status => {
    if (inventory.broken) return 'broken';
    if (inventory.in_use) return 'installed';

    return 'notInstalled';
};

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
                        inventory={inventory}
                        key={name}
                        buttonText={
                            inventory.in_use
                                ? t('pages.equipmentSet.main.remove')
                                : undefined
                        }
                        onButtonClick={() => onCardButtonClick(inventory)}
                        status={getCardStatus(inventory)}
                        repairing
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
