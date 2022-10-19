import { useNavigate } from 'react-router-dom';
import { Card } from 'shared';
import { InventoriedAssets } from 'entities/atomicassets';
import { isAssetAvailable } from 'shared/lib/utils';
import styles from '../styles.module.scss';

export function useRenderCards() {
    const navigate = useNavigate();

    return (
        items: Set<InventoriedAssets[number]> | InventoriedAssets,
        onDragStart: (element: InventoriedAssets[number]) => void
    ) => {
        return Array.from(items)?.map((card) => (
            <div
                onDragStart={() => isAssetAvailable(card) && onDragStart(card)}
                key={card.template_id}
            >
                <Card
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
