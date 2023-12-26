import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import {
    ScheduleOutlined,
    ToolOutlined,
    ProjectOutlined,
} from '@ant-design/icons';
import {
    engineerEquipmentHall,
    engineerStatAndInfo,
    engineerTraining,
} from 'app/router/paths';
import { CabinStatus } from 'entities/engineer';
import { Menu, MenuItem } from 'shared/ui';
import styles from './styles.module.scss';

const menuItems = [
    {
        icon: <ScheduleOutlined />,
        path: engineerTraining,
        unlockedAt: CabinStatus.NeedCertificate,
    },
    {
        icon: <ToolOutlined />,
        path: engineerEquipmentHall,
        unlockedAt: CabinStatus.NeedContract,
    },
    {
        icon: <ProjectOutlined />,
        path: engineerStatAndInfo,
        unlockedAt: true,
    },
];

const EngineerMenu: FC<{ status: CabinStatus }> = ({ status }) => {
    const navigate = useNavigate();

    return (
        <Menu className={styles.menu}>
            <Space size="middle">
                {menuItems.map(({ icon, unlockedAt, path }) => (
                    <MenuItem
                        key={path}
                        icon={icon}
                        disabled={unlockedAt > status}
                        onClick={() => navigate(path)}
                    />
                ))}
            </Space>
        </Menu>
    );
};

export { EngineerMenu };
