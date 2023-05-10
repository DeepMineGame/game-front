import { FC } from 'react';
import { colorizeUpgradeStatus, ExternalLink, Table } from 'shared';
import {
    ContractDto,
    ID_TO_INVENTORY,
    normalizeAttrs,
} from 'entities/smartcontract';

type Props = {
    contract: ContractDto;
};

export const AssetsInfo: FC<Props> = ({ contract }) => {
    const {
        asset_template_ids,
        upgrade_statuses,
        asset_ids_new,
        asset_ids_old,
    } = normalizeAttrs(contract.attrs);
    const equipmentNames = asset_template_ids?.map(
        (id) => ID_TO_INVENTORY[Number(id)]
    );

    const finishedDetails = equipmentNames?.map((item, index) => ({
        item,
        oldId: (
            <ExternalLink
                href={`https://wax.atomichub.io/explorer/asset/${asset_ids_old?.[index]}`}
            >
                {asset_ids_old?.[index]}
            </ExternalLink>
        ),
        newId: (
            <ExternalLink
                href={`https://wax.atomichub.io/explorer/asset/${asset_ids_new?.[index]}`}
            >
                {asset_ids_new?.[index]}
            </ExternalLink>
        ),
        status: colorizeUpgradeStatus(upgrade_statuses?.[index]),
        key: item,
    }));

    const columns = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'Old ID',
            dataIndex: 'oldId',
            key: 'oldId',
        },
        {
            title: 'New ID',
            dataIndex: 'newId',
            key: 'oldId',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    if (finishedDetails?.length) {
        return <Table dataSource={finishedDetails} columns={columns} />;
    }
    return null;
};
