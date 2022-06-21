import { Col, Row } from 'antd';
import React, { DragEventHandler, FC, useState } from 'react';
import { Button, Card, Divider, Title, useTableData } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { getInventoryConfig, UserInventoryType } from 'entities/smartcontract';
import { atomicTransfer } from 'entities/atomicassets';
import { userAtomicAssetsStore, WarehouseGate } from '../../model';
import { useSmartContractAction } from '../../../hooks';
import styles from './styles.module.scss';
import { renderCards } from './utils/renderCards';

export const ActiveInventoryAndStorageSwapper: FC<{ accountName: string }> = ({
    accountName,
}) => {
    const { t } = useTranslation();
    useGate(WarehouseGate, { accountName });
    const userAtomicAssets = useStore(userAtomicAssetsStore);
    const userInventory = useTableData<UserInventoryType>(getInventoryConfig);
    const [draggedElement, setDraggedElement] =
        useState<null | UserInventoryType>(null);
    const navigate = useNavigate();
    const [draggedElements, setDraggedElements] = useState(
        new Set<UserInventoryType>()
    );
    const onActiveInventoryDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e?.preventDefault();

        if (draggedElement) {
            setDraggedElements((state) => new Set([...state, draggedElement]));
        }
    };

    const onStorageDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e?.preventDefault();
        const removeDraggedElementFromState = (state: Set<UserInventoryType>) =>
            new Set(
                [...state].filter(
                    ({ asset_id }) => asset_id !== draggedElement?.asset_id
                )
            );
        if (draggedElement && draggedElements.has(draggedElement)) {
            setDraggedElements(removeDraggedElementFromState);
        }
    };
    const transferAction = useSmartContractAction(
        atomicTransfer({
            accountName,
            ids: Array.from(draggedElements).map(({ asset_id }) => asset_id),
        })
    );
    const onTransferClick = async () => {
        await transferAction();
        navigate(0);
    };
    return (
        <Row>
            <Col
                span={11}
                className={styles.cardColumn}
                onDrop={onActiveInventoryDrop}
                // https://stackoverflow.com/questions/32084053/why-is-ondrop-not-working
                onDragOver={(e) => e.preventDefault()}
            >
                <Title className={styles.title} level={5}>
                    {t('components.hive.activeInventory')}
                </Title>
                <div>
                    {draggedElements?.size ? (
                        <div className={styles.cardsWrapper}>
                            <div className={styles.filter}>
                                {renderCards(
                                    draggedElements,
                                    setDraggedElement
                                )}{' '}
                            </div>
                            <Divider />
                            {renderCards(userInventory, setDraggedElement)}
                        </div>
                    ) : (
                        <div className={styles.cardsWrapper}>
                            {renderCards(userInventory, setDraggedElement)}
                        </div>
                    )}
                </div>
            </Col>
            <Col
                offset={1}
                span={11}
                className={styles.cardColumn}
                onDrop={onStorageDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <Title level={5} className={styles.title}>
                    <span>{t('components.hive.storage')}</span>
                    <Button
                        type="primary"
                        disabled={draggedElements?.size === 0}
                        size="large"
                        onClick={onTransferClick}
                    >
                        {t('components.hive.confirmTransfer')}
                    </Button>
                </Title>
                <div className={styles.cardsWrapper}>
                    {userAtomicAssets.map((card) => (
                        <div
                            draggable
                            id={card.asset_id}
                            key={card.asset_id}
                            onDragStart={() => setDraggedElement(card)}
                        >
                            <Card
                                templateId={card.template_id}
                                className={styles.card}
                                key={card.asset_id}
                                initial={10}
                                current={3}
                                remained={7}
                            />
                        </div>
                    ))}
                </div>
            </Col>
        </Row>
    );
};
