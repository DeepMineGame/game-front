import { Space } from 'antd';
import {
    ScheduleOutlined,
    ToolOutlined,
    ProjectOutlined,
} from '@ant-design/icons';
import { Menu, MenuItem } from 'shared/ui';
import styles from './styles.module.scss';

const menuItems = [
    { icon: <ScheduleOutlined />, disabled: true },
    { icon: <ToolOutlined />, disabled: true },
    { icon: <ProjectOutlined />, disabled: true },
];

const EngineerMenu = () => {
    return (
        <Menu className={styles.menu}>
            <Space size="middle">
                {menuItems.map(({ icon, disabled }, idx) => (
                    <MenuItem key={idx} icon={icon} disabled={disabled} />
                ))}
            </Space>
        </Menu>
    );
};

export { EngineerMenu };
