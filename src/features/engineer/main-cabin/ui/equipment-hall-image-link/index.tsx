import { FC } from 'react';
import { Tooltip } from 'antd';
import cn from 'classnames';
import { engineerEquipmentHall } from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CabinStatus } from 'entities/engineer';
import styles from './styles.module.scss';

export const EquipmentHallImageLink: FC<{ status: CabinStatus }> = ({
    status,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // TODO: CabinStatus.NeedContract > status
    const disabled = status > 0;

    const handleClick = () => {
        if (!disabled) {
            navigate(engineerEquipmentHall);
        }
    };

    return (
        <Tooltip
            className={styles.tooltip}
            overlay={disabled ? '' : t('pages.engineer.equipmentHallTooltip')}
        >
            <div
                className={cn(styles.equipmentHall, {
                    [styles.disabled]: disabled,
                })}
                onClick={handleClick}
            />
        </Tooltip>
    );
};
