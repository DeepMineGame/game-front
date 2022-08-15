import { FC } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Line } from 'shared';
import styles from './styles.module.scss';

export type equipmentType = {
    name: string;
    isAvailable: boolean;
};

type Props = {
    equipments: equipmentType[];
};

const EquipmentTable: FC<Props> = ({ equipments }) => {
    return (
        <div className={styles.equipments}>
            {equipments.map(({ name, isAvailable }) => (
                <Line className={styles.equipmentLine} key={name}>
                    <div className={styles.equipmentName}>{name}</div>
                    <div className={styles.equipmentValue}>
                        {isAvailable ? <CheckOutlined /> : <CloseOutlined />}
                    </div>
                </Line>
            ))}
        </div>
    );
};

export { EquipmentTable };
