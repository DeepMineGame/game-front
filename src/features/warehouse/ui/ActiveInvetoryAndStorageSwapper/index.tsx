import { Col, Row } from 'antd';
import React, { DragEventHandler, FC, useState } from 'react';
import { Button, Title, useReloadPage, useTableData } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
    getInventoryConfig,
    UserInventoryType,
    withdrawAssets,
} from 'entities/smartcontract';
import { atomicTransfer } from 'entities/atomicassets';
import { userAtomicAssetsStore, WarehouseGate } from '../../model';
import { useSmartContractAction } from '../../../hooks';
import styles from './styles.module.scss';
import { useRenderCards } from './utils/useRenderCards';
import { removeDraggedElementFromState } from './utils/removeDraggedElementFromState';

export const ActiveInventoryAndStorageSwapper: FC<{ accountName: string }> = ({
    accountName,
}) => {
    const { t } = useTranslation();
    useGate(WarehouseGate, { accountName });
    const renderCards = useRenderCards();
    const userAtomicAssets = useStore(userAtomicAssetsStore);
    const { data: userInventory } =
        useTableData<UserInventoryType>(getInventoryConfig);
    const userInventoryNotUse = userInventory.filter(({ in_use }) => !in_use);

    const [draggedElement, setDraggedElement] =
        useState<null | UserInventoryType>(null);
    const reloadPage = useReloadPage();
    const [draggedElements, setDraggedElements] = useState(
        new Set<UserInventoryType>()
    );
    const isAtomicIncludesDragged =
        userAtomicAssets.filter((item) => draggedElements.has(item))?.length >
        0;

    const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e?.preventDefault();

        if (draggedElement && draggedElements.has(draggedElement)) {
            return setDraggedElements(
                removeDraggedElementFromState(draggedElement)
            );
        }
        if (draggedElement) {
            return setDraggedElements(
                (state) => new Set([...state, draggedElement])
            );
        }
        return null;
    };

    const draggedElementsIds = Array.from(draggedElements).map(
        ({ asset_id }) => asset_id
    );
    const transferFromAtomicStorageToDeepMineInventory = useSmartContractAction(
        atomicTransfer({
            accountName,
            ids: draggedElementsIds,
        })
    );
    const transferFromDeepMineInventoryToAtomicStorage = useSmartContractAction(
        withdrawAssets(accountName, draggedElementsIds)
    );
    const onTransferClick = async () => {
        if (!isAtomicIncludesDragged) {
            await transferFromDeepMineInventoryToAtomicStorage();
        } else {
            await transferFromAtomicStorageToDeepMineInventory();
        }
        return reloadPage();
    };
    return (
        <Row>
            <Col
                span={11}
                className={styles.cardColumn}
                onDrop={onDrop}
                // https://stackoverflow.com/questions/32084053/why-is-ondrop-not-working
                onDragOver={(e) => e.preventDefault()}
            >
                <Title className={styles.title} level={5}>
                    {t('components.hive.activeInventory')}
                </Title>
                <div>
                    {isAtomicIncludesDragged && draggedElements.size ? (
                        <div className={styles.draggedElements}>
                            {renderCards(draggedElements, setDraggedElement)}
                        </div>
                    ) : (
                        <div className={styles.cardsWrapper}>
                            {renderCards(
                                userInventoryNotUse,
                                setDraggedElement
                            )}
                        </div>
                    )}
                </div>
            </Col>
            <Col
                offset={1}
                span={11}
                className={styles.cardColumn}
                onDrop={onDrop}
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
                    {!isAtomicIncludesDragged && draggedElements?.size ? (
                        <div className={styles.draggedElements}>
                            {renderCards(draggedElements, setDraggedElement)}
                        </div>
                    ) : (
                        renderCards(userAtomicAssets, setDraggedElement)
                    )}
                </div>
            </Col>
        </Row>
    );
};
