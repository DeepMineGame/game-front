import { IN_GAME_NFT_IDS } from 'entities/smartcontract';

export const getGameAssets = <T1 extends any[]>(assets: T1): T1 =>
    assets.filter((asset) => IN_GAME_NFT_IDS.includes(asset.template_id)) as T1;
