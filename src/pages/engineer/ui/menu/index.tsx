import { Space } from 'antd';
import {
    ScheduleOutlined,
    ToolOutlined,
    ProjectOutlined,
} from '@ant-design/icons';
import { MenuItem } from 'shared/ui';

const menuItems = [
    { icon: <ScheduleOutlined />, disabled: true },
    { icon: <ToolOutlined />, disabled: true },
    { icon: <ProjectOutlined />, disabled: true },
];

const EngineerMenu = () => {
    return (
        <Space size="middle">
            {menuItems.map(({ icon, disabled }, idx) => (
                <MenuItem key={idx} icon={icon} disabled={disabled} />
            ))}
        </Space>
    );
};

export { EngineerMenu };
