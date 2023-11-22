import { DownSquareOutlined, ToolOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    getTimeLeftFromUtc,
    isUtcDateExpired,
    Status,
    useTick,
    Text,
    BrokenOutlined,
} from 'shared';
import { AssetStruct } from 'entities/game-stat';
import styles from '../styles.module.scss';

export const CardState: FC<{
    status?: Status;
    onFinish?: () => void;
    card: AssetStruct;
}> = ({ status, onFinish, card }) => {
    const { t } = useTranslation();
    const isFinishesAtExist = card.available_from !== undefined;
    useTick(isFinishesAtExist && !isUtcDateExpired(card.available_from));

    const isBrokenAndNotInRepair =
        isFinishesAtExist &&
        isUtcDateExpired(card.available_from) &&
        status === Status.broken;
    const isBroken =
        card.broken ||
        (!!card?.available_from && !isUtcDateExpired(card?.available_from));
    if (
        isFinishesAtExist &&
        status !== Status.broken &&
        isUtcDateExpired(card.available_from) &&
        isBroken
    )
        onFinish?.();
    const brokenText = isBrokenAndNotInRepair
        ? t('kit.cardStates.broken')
        : getTimeLeftFromUtc(card.available_from);
    const brokenIcon = isBrokenAndNotInRepair ? (
        <BrokenOutlined />
    ) : (
        <ToolOutlined className={styles.iconTool} />
    );
    const inRent = card.rent_contract_id;

    if (inRent || isBroken) {
        return (
            <div className={styles.stateWrapper}>
                <div className={styles.cardState}>
                    {inRent ? <DownSquareOutlined /> : brokenIcon}
                    <Text type="secondary">
                        {inRent ? t('Rented') : brokenText}
                    </Text>
                </div>
            </div>
        );
    }
    return null;
};
