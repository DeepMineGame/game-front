import {
    InventoriesDto,
    LOCATION_TO_ID,
    mineAssetTemplateId,
    MineDto,
    UserDto,
} from 'entities/smartcontract';

export const hasMineNftFilter = (data: InventoriesDto[] | null) => {
    return Boolean(
        data?.filter(
            ({ asset_template_id }) => asset_template_id === mineAssetTemplateId
        )[0]
    );
};

export const checkIsUserLocationOutsideMineFilter = (user: UserDto[] | null) =>
    user?.[0]?.location !== LOCATION_TO_ID.mine_deck;

export const checkIsMineInActiveFilter = (mines: MineDto[] | null) =>
    !mines?.[0]?.is_active;
