import { useTranslation } from 'react-i18next';
import {
    CardHolder,
    useReloadPage,
    useRepair,
    Status,
    getCardStatus,
    Card,
} from 'shared';
import { FC } from 'react';
import { InventoryNameType } from 'entities/smartcontract';
import { InventoriedAssets } from 'entities/atomicassets';
import styles from './styles.module.scss';

interface Props {
    selectedEquipment:
        | Record<InventoryNameType, InventoriedAssets[number]>
        | {};
    onCardInUseRemove: (inventory: InventoriedAssets[number]) => void;
    onCardHolderClick: (name: InventoryNameType) => void;
    onCardNotInUseRemove: (name: InventoryNameType) => void;
    isMining?: boolean;
}

export const EquipmentCards: FC<Props> = ({
    selectedEquipment,
    onCardInUseRemove,
    onCardHolderClick,
    onCardNotInUseRemove,
    isMining,
}) => {
    const { t } = useTranslation();
    const reload = useReloadPage();
    const { getFinishesAtTime } = useRepair();

    return (
        <div className={styles.cards}>
            {Object.entries(selectedEquipment).map(([name, inventory]) =>
                inventory ? (
                    <Card
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
                            isMining
                                ? undefined
                                : t('pages.equipmentSet.main.remove')
                        }
                        onButtonClick={
                            inventory.in_use
                                ? () => onCardInUseRemove(inventory)
                                : () =>
                                      onCardNotInUseRemove(
                                          name as InventoryNameType
                                      )
                        }
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
