import {
    ActionDto,
    ActionType,
    ContractDto,
    ContractStatus,
    LOCATION_TO_ID,
    mineAssetTemplateId,
    MineDto,
    MineState,
    UserDto,
    UserInventoryType,
} from 'entities/smartcontract';
import {
    $mineOwnerCabinState,
    mineOwnerCabinState,
} from '../models/mineOwnerState';

export const ignoreIfInStatus = (
    $currentStatus: typeof $mineOwnerCabinState,
    targetStatuses: mineOwnerCabinState[]
) => {
    return (param: boolean) =>
        !targetStatuses.includes($currentStatus.getState()) && param;
};
export const hasMineNftFilter = (inventories: UserInventoryType[] | null) => {
    return !inventories?.filter(
        ({ template_id }) => template_id === mineAssetTemplateId
    )?.[0];
};

export const checkIsUserLocationOutsideMineFilter = (user: UserDto[] | null) =>
    Boolean(user?.[0]?.location !== LOCATION_TO_ID.mine_deck);

export const checkIsContractInactive = ({
    mineOwnerLandlordContractForUserStore: contract,
    inventoriesStore,
}: {
    mineOwnerLandlordContractForUserStore: ContractDto | 'empty' | 'init';
    inventoriesStore: UserInventoryType[] | null;
}) => {
    if (contract === 'empty' && !hasMineNftFilter(inventoriesStore)) {
        return true;
    }
    if (contract === 'init' || contract === 'empty') {
        return false;
    }
    return contract?.status !== ContractStatus.active;
};

export const checkMineNotSetup = ({
    userMineStore,
    mineOwnerLandlordContractForUserStore,
}: {
    userMineStore: MineDto[] | null;
    mineOwnerLandlordContractForUserStore: ContractDto | 'empty' | 'init';
}) => {
    const hasActiveContract =
        mineOwnerLandlordContractForUserStore !== 'init' &&
        mineOwnerLandlordContractForUserStore !== 'empty' &&
        mineOwnerLandlordContractForUserStore?.status === ContractStatus.active;
    const isMineEmpty = userMineStore === null;
    const isMineNotSetuped = userMineStore?.[0]?.state !== MineState.setuped;

    if (userMineStore === null) {
        return false;
    }
    return hasActiveContract && (isMineEmpty || isMineNotSetuped);
};

export const checkIfMineSetupWillFinishedInFuture = (
    actions: ActionDto[] | null
) => {
    const mineSetupAction = actions?.filter(
        ({ type }) => type === ActionType.mine_setup
    );
    return Boolean(
        mineSetupAction?.[0] &&
            new Date(mineSetupAction[0].finishes_at * 1000) > new Date()
    );
};

export const hasMinesFilter = (mines: MineDto[] | null) =>
    Number(mines?.length) > 0;

export const isMineActiveFilter = (mines: MineDto[] | null) =>
    mines?.[0]?.state === MineState.activated;
