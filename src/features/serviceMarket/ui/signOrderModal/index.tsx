import React, { FC, useEffect } from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useTableData } from 'shared';
import {
    getInventoryConfig,
    SlotStatus,
    UserInventoryType,
} from 'entities/smartcontract';
import { Button, Loader, Modal, Result, Select, Text } from 'shared/ui';
import { AreasGate, areasStore, getAreasEffect } from '../../orders/model';
import styles from './styles.module.scss';

type Props = {
    isVisible: boolean;
    isDisabled: boolean;
    areaId: string;
    setAreaSlotId: (value: string) => void;
    onSelect: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
};

const Content: FC<{
    isLoading: boolean;
    noMines: boolean;
    areaSlot: number;
}> = ({ isLoading, noMines, areaSlot, children }) => {
    const { t } = useTranslation();

    if (isLoading) {
        return <Loader className={styles.loader} centered size="large" />;
    }

    if (noMines) {
        return (
            <Result
                className={styles.info}
                icon={<ExclamationCircleFilled className={styles.infoIcon} />}
                title={t('pages.mineOperationOrder.doNotHaveMine')}
            />
        );
    }

    if (areaSlot < 0) {
        return (
            <Result
                className={styles.info}
                icon={<ExclamationCircleFilled className={styles.infoIcon} />}
                title={t('pages.mineOperationOrder.doNotHaveArea')}
            />
        );
    }

    return <div>{children}</div>;
};

const SignOrderModal: FC<Props> = ({
    isVisible,
    isDisabled,
    areaId,
    setAreaSlotId,
    onSelect,
    onSubmit,
    onCancel,
}) => {
    const { t } = useTranslation();
    useGate(AreasGate, { areaId });
    const { data: userInventory, isLoading: isInventoryLoading } =
        useTableData<UserInventoryType>(getInventoryConfig);
    const userAreas = useStore(areasStore);

    const isAreasLoading = useStore(getAreasEffect.pending);
    const emptySlot =
        userAreas?.[0]?.mine_slots.findIndex((slot) => {
            return slot.reserved === SlotStatus.reserved;
        }) ?? -1;
    const noMinesOrArea = !userInventory.length || emptySlot < 0;

    useEffect(() => {
        if (emptySlot !== -1) {
            setAreaSlotId(`${emptySlot}`);
        }
    }, [emptySlot]);

    return (
        <Modal
            visible={isVisible}
            title={t('pages.mineOperationOrder.selectMine')}
            onCancel={onCancel}
            footer={
                noMinesOrArea
                    ? [
                          <Button key="submit" type="primary">
                              {t('components.common.button.visitMarketplace')}
                          </Button>,
                      ]
                    : [
                          <Button key="back" type="ghost" onClick={onCancel}>
                              {t('components.common.button.cancel')}
                          </Button>,
                          <Button
                              key="submit"
                              type="primary"
                              disabled={isDisabled}
                              onClick={onSubmit}
                          >
                              {t('components.common.button.sign')}
                          </Button>,
                      ]
            }
        >
            <Content
                isLoading={isInventoryLoading || isAreasLoading}
                noMines={!userInventory.length}
                areaSlot={emptySlot}
            >
                <div className={styles.selectWrapper}>
                    <Text className={styles.selectTitle}>
                        {t('components.common.mine.title')}
                    </Text>
                    <Select
                        onChange={onSelect}
                        className={styles.select}
                        placeholder={t('pages.mineOperationOrder.selectMine')}
                        options={userInventory.map(({ asset_id }) => ({
                            value: asset_id,
                            label: `ID${asset_id}`,
                        }))}
                    />
                </div>
            </Content>
        </Modal>
    );
};

export { SignOrderModal };
