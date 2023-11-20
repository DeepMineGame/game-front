import { DragEventHandler, FC, useCallback, useRef, useState } from 'react';
import { Col, Radio, RadioChangeEvent, Row, Space } from 'antd';
import {
    Button,
    desktopS,
    Title,
    useMediaQuery,
    useReloadPage,
    useTravelConfirm,
    throttle,
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
import { atomicTransfer } from 'entities/atomicassets';
import { AssetStruct } from 'entities/game-stat';
import {
    $storage,
    WarehouseGate,
    $inventoryAssets,
    getUserStorageAssets,
} from '../../model';
import { useSmartContractAction } from '../../../hooks';
import {
    $inventoryTypeToggleState,
    InventoryTypeRadioButtonValues,
    inventoryTypeToggle,
} from '../../model/inventory-type-toggle';
import {
    $rentInventory,
    getRentAssetsEffect,
} from '../../../rental-hub/create-rent-order/models';
import styles from './styles.module.scss';
import { useRenderCards } from './utils/useRenderCards';
import { removeDraggedElementFromState } from './utils/removeDraggedElementFromState';

export const DEFAULT_AMOUNT_STORAGE_NFT = 100;

export const ActiveInventoryAndStorageSwapper: FC<{ accountName: string }> = ({
    accountName,
}) => {
    const { t } = useTranslation();
    useGate(WarehouseGate, { searchParam: accountName });
    const [storageOffset, setStorageOffset] = useState(0);
    const isDesktop = useMediaQuery(desktopS);
    const isInHive = useStore(isUserInHive);
    const { travelConfirm } = useTravelConfirm(LOCATION_TO_ID.hive);
    const renderCards = useRenderCards();
    const storageAssets = useStore($storage);
    const inventoryAssets = useStore($inventoryAssets);
    const throttleGetUserStorage = useRef((offset: number) =>
        throttle(() => {
            getUserStorageAssets({
                searchParam: accountName,
                offset,
            });
        }, 1000)
    );
    const onScrollLoadStorage = useCallback(() => {
        setStorageOffset(storageOffset + DEFAULT_AMOUNT_STORAGE_NFT);
        throttleGetUserStorage.current(storageOffset)();
    }, [accountName, storageOffset]);
    const [draggedElement, setDraggedElement] = useState<null | AssetStruct>(
        null
    );

    const reloadPage = useReloadPage();
    const [draggedElements, setDraggedElements] = useState(
        new Set<AssetStruct>()
    );

    const isAtomicIncludesDragged =
        storageAssets.filter((item) => draggedElements.has(item))?.length > 0;

    const toggleDraggedElements = (e?: DragEvent, element?: AssetStruct) => {
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

    const handleDragCard = (element: AssetStruct) => {
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
    const rentInventoryAtomicAssets = useStore($rentInventory);

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
                                    {t('Rent inventory')}
                                </Radio>
                            </Radio.Group>
                        </Col>
                        <Col style={{ height: 40 }} />
                    </Row>
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
                                    : inventoryAssets,
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
                </Space>
                <div className={styles.cardsWrapper}>
                    {isActiveInventoryAssetDragging ? (
                        <div className={styles.draggedElements}>
                            {renderCards(draggedElements, handleDragCard)}
                        </div>
                    ) : (
                        renderCards(
                            storageAssets,
                            handleDragCard,
                            onScrollLoadStorage
                        )
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
