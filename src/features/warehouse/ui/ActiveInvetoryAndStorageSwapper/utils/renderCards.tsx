import React from 'react';
import { Card } from 'shared';
import { UserInventoryType } from 'entities/smartcontract';
import styles from '../styles.module.scss';

export function renderCards(
    items: Set<UserInventoryType> | UserInventoryType[],
    onDragStart: (element: UserInventoryType) => void
) {
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
            />
        </div>
    ));
}
