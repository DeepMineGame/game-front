import {
    BulbOutlined,
    ClockCircleOutlined,
    DoubleRightOutlined,
    LineOutlined,
    ToolOutlined,
    UpSquareOutlined,
} from '@ant-design/icons';
import { secondsToTime } from 'shared';
import { getUpgradeKitType } from 'features/engineer';
import {
    ContractDto,
    ID_TO_INVENTORY,
    normalizeAttrs,
} from 'entities/smartcontract';

const SET_AMOUNT = 5;
export const getDataSource = (contract: ContractDto) => {
    const {
        engineer_exp,
        time_spent,
        asset_template_ids,
        upgrade_statuses,
        upgrade_levels,
    } = normalizeAttrs(contract.attrs);

    const equipmentNames = asset_template_ids?.map(
        (id) => ID_TO_INVENTORY[Number(id)]
    );
    const isEquipmentSet = equipmentNames?.length === SET_AMOUNT;

    if (isEquipmentSet) {
        return equipmentNames?.map((name, i) => {
            return {
                key: name,
                icon:
                    upgrade_statuses?.[i] === 'success'
                        ? DoubleRightOutlined
                        : LineOutlined,
                title: name,
                value: upgrade_statuses?.[i],
            };
        });
    }

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
            value: `level ${upgrade_levels?.[0] || 'not changed'}`,
        },
        {
            key: 'kit',
            icon: ToolOutlined,
            title: 'pages.engineer.upgradeKit',
            value: getUpgradeKitType(contract),
        },
    ];
};
