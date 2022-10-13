import { FC } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Line } from 'shared';
import { $miningEquipments } from 'features';
import styles from './styles.module.scss';

type EquipmentTableProps = {
    equipments: ReturnType<typeof $miningEquipments['getState']>;
};

export const EquipmentTable: FC<EquipmentTableProps> = ({ equipments }) => (
    <div className={styles.equipments}>
        {equipments &&
            Object.entries(equipments).map(([name, value]) => (
                <Line className={styles.equipmentLine} key={name}>
                    <div className={styles.equipmentName}>{name}</div>
                    <div className={styles.equipmentValue}>
                        {value ? <CheckOutlined /> : <CloseOutlined />}
                    </div>
                </Line>
            ))}
    </div>
);
