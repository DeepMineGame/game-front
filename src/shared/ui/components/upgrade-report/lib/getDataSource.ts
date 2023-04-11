import {
    BulbOutlined,
    ClockCircleOutlined,
    ToolOutlined,
    UpSquareOutlined,
} from '@ant-design/icons';
import { secondsToTime } from 'shared';
import { getUpgradeKitType } from 'features/engineer';
import { ContractDto, normalizeAttrs } from 'entities/smartcontract';

export const getDataSource = (contract: ContractDto) => {
    const { engineer_exp, time_spent, level } = normalizeAttrs(contract.attrs);

    return [
        {
            key: 'exp',
            icon: BulbOutlined,
            title: 'pages.engineer.experience',
            value: engineer_exp,
        },
        {
            key: 'time',
            icon: ClockCircleOutlined,
            title: 'pages.engineer.timeSpent',
            value: secondsToTime(time_spent || 0),
        },
        {
            key: 'lvl',
            icon: UpSquareOutlined,
            title: 'pages.engineer.newLevel',
            value: `level ${level || 'Not changed'}`,
        },
        {
            key: 'kit',
            icon: ToolOutlined,
            title: 'pages.engineer.upgradeKit',
            value: getUpgradeKitType(contract),
        },
    ];
};
