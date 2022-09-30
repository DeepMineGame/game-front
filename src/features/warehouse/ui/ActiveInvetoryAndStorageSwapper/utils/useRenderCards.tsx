import { useNavigate } from 'react-router-dom';
import { AssetCard } from 'features';
import { UserInventoryType } from 'entities/smartcontract';
import styles from '../styles.module.scss';

export function useRenderCards() {
    const navigate = useNavigate();
    const isCardAvailable = (card: UserInventoryType) =>
        card.available_from === undefined ||
        (card.available_from !== undefined &&
            card.available_from < new Date().getTime());

    return (
        items: Set<UserInventoryType> | UserInventoryType[],
        onDragStart: (element: UserInventoryType) => void
    ) => {
        return Array.from(items)?.map((card) => (
            <div
                onDragStart={() => isCardAvailable(card) && onDragStart(card)}
                key={card.template_id}
            >
                <AssetCard
                    inventory={card}
                    className={styles.card}
                    key={card.asset_id}
                    buttonText="Details"
                    onButtonClick={() =>
                        navigate(`/inventory/${card.asset_id}`)
                    }
                    showCardBadgeStatus={false}
                />
            </div>
        ));
    };
}
