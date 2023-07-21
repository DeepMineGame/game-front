import { DragEventHandler, FC, useState } from 'react';
import { Col, Radio, RadioChangeEvent, Row, Space } from 'antd';
import {
    Button,
    desktopS,
    Title,
    useMediaQuery,
    useReloadPage,
    useTravelConfirm,
} from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { isUserInHive } from 'features/hive';
import { CallToTravelNotification } from 'features/physical-shift';
import {
    deepminegame,
    deepminesmrt,
    LOCATION_TO_ID,
    withdrawAssets,
} from 'entities/smartcontract';
import {
    atomicTransfer,
    MergedInventoryWithAtomicAssets,
} from 'entities/atomicassets';
import { $mergedStorageWithAtomicAssets, WarehouseGate } from '../../model';
import { useSmartContractAction } from '../../../hooks';
import { TypeFilter } from '../filters/TypeFilter';
import { NameFilter } from '../filters/NameFilter';
import {
    $activeInventoryAssetName,
    $assetType,
    $filteredActiveInventoryAssets,
    $filteredActiveInventoryAssetsByType,
    $filteredStorageAssets,
    $filteredStorageAssetsByType,
    $storageAssetName,
    changeActiveInventoryAssetName,
    changeStorageAssetName,
    changeType,
    DraggableAssetsGate,
} from '../../model/filter';
import {
    $inventoryTypeToggleState,
    InventoryTypeRadioButtonValues,
    inventoryTypeToggle,
} from '../../model/inventory-type-toggle';
import {
    $rentInventoryAtomicAssets,
    getRentAssetsEffect,
} from '../../model/rent-inventory';
import styles from './styles.module.scss';
import { useRenderCards } from './utils/useRenderCards';
import { removeDraggedElementFromState } from './utils/removeDraggedElementFromState';

export const ActiveInventoryAndStorageSwapper: FC<{ accountName: string }> = ({
    accountName,
}) => {
    const { t } = useTranslation();
    useGate(WarehouseGate, { searchParam: accountName });
    const isDesktop = useMediaQuery(desktopS);
    const isInHive = useStore(isUserInHive);
    const { travelConfirm } = useTravelConfirm(LOCATION_TO_ID.hive);
    const renderCards = useRenderCards();
    const mergedStorageWithAtomicAssets = useStore(
        $mergedStorageWithAtomicAssets
    );

    const assetTypeFilter = useStore($assetType);
    const activeInventoryAssetNameFilter = useStore($activeInventoryAssetName);
    const storageAssetNameFilter = useStore($storageAssetName);
    const filteredActiveInventoryAssetsByType = useStore(
        $filteredActiveInventoryAssetsByType
    );
    const filteredStorageAssetsByType = useStore($filteredStorageAssetsByType);
    const filteredActiveInventoryAssets = useStore(
        $filteredActiveInventoryAssets
    );
    const filteredStorageAssets = useStore($filteredStorageAssets);

    const [draggedElement, setDraggedElement] = useState<
        null | MergedInventoryWithAtomicAssets[number]
    >(null);

    const reloadPage = useReloadPage();
    const [draggedElements, setDraggedElements] = useState(
        new Set<MergedInventoryWithAtomicAssets[number]>()
    );

    useGate(DraggableAssetsGate, { assets: draggedElements });

    const isAtomicIncludesDragged =
        mergedStorageWithAtomicAssets.filter((item) =>
            draggedElements.has(item)
        )?.length > 0;

    const toggleDraggedElements = (
        e?: DragEvent,
        element?: MergedInventoryWithAtomicAssets[number]
    ) => {
        e?.preventDefault();
        const selectedElem = element || draggedElement;

        if (!isInHive) {
            return travelConfirm();
        }

        if (selectedElem && draggedElements.has(selectedElem)) {
            return setDraggedElements(
                removeDraggedElementFromState(selectedElem)
            );
        }
        if (selectedElem) {
            return setDraggedElements(
                (state) => new Set([...state, selectedElem])
            );
        }
        return null;
    };

    const draggedElementsIds = Array.from(draggedElements).map(
        ({ asset_id }) => asset_id
    );
    const inventoryTypeToggleState = useStore($inventoryTypeToggleState);

    const transferFromAtomicStorageToDeepMineInventory = useSmartContractAction(
        {
            action: atomicTransfer({
                accountName,
                ids: draggedElementsIds,
                to:
                    inventoryTypeToggleState ===
                    InventoryTypeRadioButtonValues.active
                        ? deepminegame
                        : deepminesmrt,
            }),
        }
    );
    const isRentStorageSelected =
        inventoryTypeToggleState === InventoryTypeRadioButtonValues.rent;
    const transferFromDeepMineInventoryToAtomicStorage = useSmartContractAction(
        {
            action: withdrawAssets(
                accountName,
                draggedElementsIds,
                isRentStorageSelected ? deepminesmrt : deepminegame
            ),
        }
    );
    const onTransferClick = async () => {
        if (!isAtomicIncludesDragged) {
            await transferFromDeepMineInventoryToAtomicStorage();
        } else {
            await transferFromAtomicStorageToDeepMineInventory();
        }
        return reloadPage();
    };

    const handleDragCard = (
        element: MergedInventoryWithAtomicAssets[number]
    ) => {
        if (!isInHive) {
            return;
        }
        if (isDesktop) {
            return setDraggedElement(element);
        }
        return toggleDraggedElements(undefined, element);
    };

    const hasDraggingElement = !!draggedElements.size;
    const isActiveInventoryAssetDragging =
        !isAtomicIncludesDragged && hasDraggingElement;

    const isStorageAssetDragging =
        isAtomicIncludesDragged && hasDraggingElement;
    const rentInventoryAtomicAssets = useStore($rentInventoryAtomicAssets);

    return (
        <Row>
            <Col
                span={11}
                className={styles.cardColumn}
                onDrop={
                    toggleDraggedElements as unknown as DragEventHandler<HTMLDivElement>
                }
                // https://stackoverflow.com/questions/32084053/why-is-ondrop-not-working
                onDragOver={(e) => e.preventDefault()}
            >
                <Space
                    direction="vertical"
                    size="large"
                    className={styles.space}
                >
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Title level={4}>{t('Inventory')}</Title>
                            <Radio.Group
                                onChange={(e: RadioChangeEvent) =>
                                    inventoryTypeToggle(e.target.value)
                                }
                                value={inventoryTypeToggleState}
                            >
                                <Radio
                                    value={
                                        InventoryTypeRadioButtonValues.active
                                    }
                                >
                                    {t('Active inventory')}
                                </Radio>
                                <Radio
                                    value={InventoryTypeRadioButtonValues.rent}
                                    onClick={() =>
                                        getRentAssetsEffect({
                                            searchParam: accountName,
                                        })
                                    }
                                >
                                    {t('Rent storage')}
                                </Radio>
                            </Radio.Group>
                        </Col>
                        <Col style={{ height: 40 }} />
                    </Row>
                    {!isStorageAssetDragging && (
                        <div>
                            <TypeFilter
                                activeTab={assetTypeFilter}
                                onChange={changeType}
                            />
                            <NameFilter
                                items={filteredActiveInventoryAssetsByType}
                                value={activeInventoryAssetNameFilter}
                                onChange={changeActiveInventoryAssetName}
                            />
                        </div>
                    )}
                </Space>
                <div>
                    {isStorageAssetDragging ? (
                        <div className={styles.draggedElements}>
                            {renderCards(draggedElements, handleDragCard)}
                        </div>
                    ) : (
                        <div className={styles.cardsWrapper}>
                            {renderCards(
                                isRentStorageSelected
                                    ? (rentInventoryAtomicAssets as any)
                                    : filteredActiveInventoryAssets,
                                handleDragCard
                            )}
                        </div>
                    )}
                </div>
            </Col>
            <Col
                offset={1}
                span={11}
                className={styles.cardColumn}
                onDrop={
                    toggleDraggedElements as unknown as DragEventHandler<HTMLDivElement>
                }
                onDragOver={(e) => e.preventDefault()}
            >
                <Space
                    direction="vertical"
                    size="large"
                    className={styles.space}
                >
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Title level={4}>{t('Storage')}</Title>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                disabled={!draggedElements?.size || !isInHive}
                                size="large"
                                onClick={onTransferClick}
                            >
                                {t('Confirm transfer')}
                            </Button>
                        </Col>
                    </Row>
                    {!isActiveInventoryAssetDragging && (
                        <div>
                            <TypeFilter
                                onChange={changeType}
                                activeTab={assetTypeFilter}
                            />
                            <NameFilter
                                items={filteredStorageAssetsByType}
                                value={storageAssetNameFilter}
                                onChange={changeStorageAssetName}
                            />
                        </div>
                    )}
                </Space>
                <div className={styles.cardsWrapper}>
                    {isActiveInventoryAssetDragging ? (
                        <div className={styles.draggedElements}>
                            {renderCards(draggedElements, handleDragCard)}
                        </div>
                    ) : (
                        renderCards(filteredStorageAssets, handleDragCard)
                    )}
                </div>
            </Col>
            {!isInHive && (
                <CallToTravelNotification
                    toLocationId={LOCATION_TO_ID.hive}
                    onSuccess={reloadPage}
                />
            )}
        </Row>
    );
};
