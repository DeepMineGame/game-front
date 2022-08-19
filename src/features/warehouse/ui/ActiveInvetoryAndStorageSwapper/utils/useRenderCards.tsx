import { Card } from 'shared';
import { useNavigate } from 'react-router-dom';
import { UserInventoryType } from 'entities/smartcontract';
import styles from '../styles.module.scss';

export const useRenderCards = () => {
    const navigate = useNavigate();

    return (
        items: Set<UserInventoryType> | UserInventoryType[],
        onDragStart: (element: UserInventoryType) => void
    ) => {
        return Array.from(items)?.map((card) => (
            <div onDragStart={() => onDragStart(card)} key={card.template_id}>
                <Card
                    templateId={card.template_id}
                    className={styles.card}
                    key={card.asset_id}
                    initial={10}
                    current={3}
                    remained={7}
                    buttonText="Details"
                    onButtonClick={() =>
                        navigate(`/inventory/${card.asset_id}`)
                    }
                />
            </div>
        ));
    };
};
