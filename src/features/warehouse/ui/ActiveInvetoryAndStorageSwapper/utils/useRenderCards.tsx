import { useNavigate } from 'react-router-dom';
import { Card2, desktopS, useMediaQuery } from 'shared';
import { useTranslation } from 'react-i18next';
import { AssetStruct } from 'entities/game-stat';
import { isAssetAvailable } from 'shared/lib/utils';
import styles from '../styles.module.scss';

export function useRenderCards() {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery(desktopS);
    const { t } = useTranslation();

    return (
        items: Set<AssetStruct> | AssetStruct[],
        onDragStart: (element: AssetStruct) => void
    ) => {
        return Array.from(items)?.map((card) => (
            <div
                onDragStart={() => isAssetAvailable(card) && onDragStart(card)}
                onTouchEnd={() =>
                    !isDesktop && isAssetAvailable(card) && onDragStart(card)
                }
                key={card.asset_id}
            >
                <Card2
                    inventory={card as unknown as AssetStruct}
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
