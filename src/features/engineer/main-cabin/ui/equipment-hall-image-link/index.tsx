import { Tooltip } from 'antd';
import styles from './styles.module.scss';

export const EquipmentHallImageLink = () => {
    return (
        <Tooltip
            className={styles.tooltip}
            overlay="Your equipment hall is located here"
        >
            <div className={styles.equipmentHall} />
        </Tooltip>
    );
};
