import { useTranslation } from 'react-i18next';
import {
    CardHolder,
    Card,
    useReloadPage,
    useRepair,
    getCardStatus,
} from 'shared';
import { Tooltip } from 'antd';
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
                    <Tooltip
                        overlay={
                            getCardStatus(inventory) === 'broken' &&
                            t('pages.equipmentSet.main.tooltipForDamagedEquip')
                        }
                    >
                        <div>
                            <Card
                                inventory={inventory}
                                key={name}
                                buttonText={
                                    inventory.in_use
                                        ? t('pages.equipmentSet.main.remove')
                                        : undefined
                                }
                                onButtonClick={() =>
                                    onCardButtonClick(inventory)
                                }
                                onRepairFinish={reload}
                                repairFinishesAt={getFinishesAtTime(inventory)}
                                withStatus
                            />
                        </div>
                    </Tooltip>
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
