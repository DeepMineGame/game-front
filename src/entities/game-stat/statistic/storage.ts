import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { AssetStruct } from './mining';

export const EquipmentTypes = {
    areas: 'areas',
    equipment: 'equipment',
    structures: 'structures',
    badges: 'badges',
    schemas: 'schemas',
    upgrade_kits: 'upgrade_kits',
    cutter: 'cutter',
    wandering_reactor: 'wandering_reactor',
    plunging_blocks: 'plunging_blocks',
    delaminator: 'delaminator',
    dme_wire: 'dme_wire',
};
export const getStorageAssets = async ({
    searchParam,
    offset,
    inventory_type,
}: {
    searchParam: string;
    offset?: number;
    inventory_type?: typeof EquipmentTypes;
}) => {
    const { data } = await axios.get<{ user: string }, { data: AssetStruct[] }>(
        `${ENDPOINT}/statistic/storage`,
        {
            params: {
                user: searchParam,
                offset,
                inventory_type,
            },
        }
    );
    return data;
};
