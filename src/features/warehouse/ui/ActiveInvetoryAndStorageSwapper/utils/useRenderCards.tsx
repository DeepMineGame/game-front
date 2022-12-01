import { useNavigate } from 'react-router-dom';
import { Card } from 'shared';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import { isAssetAvailable } from 'shared/lib/utils';
import styles from '../styles.module.scss';

export function useRenderCards() {
    const navigate = useNavigate();

    return (
        items:
            | Set<MergedInventoryWithAtomicAssets[number]>
            | MergedInventoryWithAtomicAssets,
        onDragStart: (element: MergedInventoryWithAtomicAssets[number]) => void,
        hideDetails?: boolean
    ) => {
        return Array.from(items)?.map((card) => (
            <div
                onDragStart={() => isAssetAvailable(card) && onDragStart(card)}
                key={card.asset_id}
            >
                <Card
                    inventory={card}
                    className={styles.card}
                    key={card.asset_id}
                    buttonText={hideDetails ? undefined : 'Details'}
                    onButtonClick={() =>
                        navigate(`/inventory/${card.asset_id}`)
                    }
                    showCardBadgeStatus={false}
                />
            </div>
        ));
    };
}
