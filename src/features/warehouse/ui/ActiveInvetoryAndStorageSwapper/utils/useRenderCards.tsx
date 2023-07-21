import { useNavigate } from 'react-router-dom';
import { Card, desktopS, useMediaQuery } from 'shared';
import { useTranslation } from 'react-i18next';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import { isAssetAvailable } from 'shared/lib/utils';
import styles from '../styles.module.scss';

export function useRenderCards() {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();

    return (
        items:
            | Set<MergedInventoryWithAtomicAssets[number]>
            | MergedInventoryWithAtomicAssets,

        onDragStart: (element: MergedInventoryWithAtomicAssets[number]) => void
    ) => {
        return Array.from(items)?.map((card) => (
            <div
                onDragStart={() => isAssetAvailable(card) && onDragStart(card)}
                onTouchEnd={() =>
                    !isDesktop && isAssetAvailable(card) && onDragStart(card)
                }
                key={card.asset_id}
            >
                <Card
                    inventory={card}
                    className={styles.card}
                    key={card.asset_id}
                    buttonText={t('Details')}
                    onButtonClick={() =>
                        navigate(`/inventory/${card.asset_id}`)
                    }
                    showCardBadgeStatus={false}
                />
            </div>
        ));
    };
}
