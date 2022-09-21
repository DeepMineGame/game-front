import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const EquipmentHallImageLink = () => {
    const { t } = useTranslation();

    return (
        <Tooltip
            className={styles.tooltip}
            overlay={t('pages.engineer.equipmentHallTooltip')}
        >
            <div className={styles.equipmentHall} />
        </Tooltip>
    );
};
