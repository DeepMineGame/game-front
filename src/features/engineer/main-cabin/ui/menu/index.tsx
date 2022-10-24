import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import {
    ScheduleOutlined,
    ToolOutlined,
    ProjectOutlined,
} from '@ant-design/icons';
import { engineer, engineerEquipmentHall } from 'app/router/paths';
import { CabinStatus } from 'entities/engineer';
import { Menu, MenuItem } from 'shared/ui';
import styles from './styles.module.scss';

const menuItems = [
    {
        icon: <ScheduleOutlined />,
        path: engineer,
        unlockedAt: CabinStatus.NeedCertificate,
    },
    {
        icon: <ToolOutlined />,
        path: engineerEquipmentHall,
        unlockedAt: CabinStatus.NeedContract,
    },
    {
        icon: <ProjectOutlined />,
        path: '',
        unlockedAt: CabinStatus.CanSeeStats,
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
