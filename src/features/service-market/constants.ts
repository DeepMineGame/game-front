export enum e_upg_asset_type {
    undefined,
    cutter,
    wandering_reactor,
    plunging_blocks,
    delaminator,
    dme_wire,
    mine,
}

export const equipmentNames = {
    [e_upg_asset_type.undefined]: 'N/A',
    [e_upg_asset_type.cutter]: 'Cutter',
    [e_upg_asset_type.wandering_reactor]: 'Wandering reactor',
    [e_upg_asset_type.plunging_blocks]: 'Plunging blocks',
    [e_upg_asset_type.delaminator]: 'Delaminator',
    [e_upg_asset_type.dme_wire]: 'Dme wire',
    [e_upg_asset_type.mine]: 'Mine',
};
