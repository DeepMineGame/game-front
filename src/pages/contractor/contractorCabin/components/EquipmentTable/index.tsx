import { FC } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Line } from 'shared';
import { UserInventoryType } from 'entities/smartcontract';
import styles from './styles.module.scss';

type EquipmentTableProps = {
    equipments: Record<string, UserInventoryType | undefined>;
};

export const EquipmentTable: FC<EquipmentTableProps> = ({ equipments }) => (
    <div className={styles.equipments}>
        {Object.entries(equipments!)?.map(([name, value]) => (
            <Line className={styles.equipmentLine} key={name}>
                <div className={styles.equipmentName}>{name}</div>
                <div className={styles.equipmentValue}>
                    {value ? <CheckOutlined /> : <CloseOutlined />}
                </div>
            </Line>
        ))}
    </div>
);
