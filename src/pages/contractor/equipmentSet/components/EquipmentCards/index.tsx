import { useTranslation } from 'react-i18next';
import { CardHolder, useReloadPage, useRepair, Status } from 'shared';
import { AssetCard, getCardStatus } from 'features';
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
    const reload = useReloadPage();
    const { getFinishesAtTime } = useRepair();

    return (
        <div className={styles.cards}>
            {Object.entries(selectedEquipment).map(([name, inventory]) =>
                inventory ? (
                    <AssetCard
                        tooltipOverlay={
                            getCardStatus(inventory) === Status.broken
                                ? t(
                                      'pages.equipmentSet.main.tooltipForDamagedEquip'
                                  )
                                : undefined
                        }
                        inventory={inventory}
                        key={name}
                        buttonText={
                            inventory.in_use
                                ? t('pages.equipmentSet.main.remove')
                                : undefined
                        }
                        onButtonClick={() => onCardButtonClick(inventory)}
                        onRepairFinish={reload}
                        repairFinishesAt={getFinishesAtTime(inventory)}
                        showCardBadgeStatus
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
