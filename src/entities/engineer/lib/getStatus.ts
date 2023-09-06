import { Nullable } from 'global';
import {
    getEngineerActiveContract,
    getEngineerCompletedContracts,
} from 'features/engineer';
import {
    ActionDto,
    ContractDto,
    EngineerType,
    InUseType,
    LOCATION_TO_ID,
    UserDto,
    UserInventoryType,
} from 'entities/smartcontract';
import { CabinStatus } from '../types';

type EngineersStore = {
    certificate: UserInventoryType;
    user: UserDto;
    engineer: EngineerType;
    contracts: ContractDto[];
    openSkillAction: ActionDto;
};

export const getStatus = ({
    certificate,
    user,
    engineer,
    contracts,
    openSkillAction,
}: Nullable<EngineersStore>): CabinStatus => {
    if (!certificate) {
        return CabinStatus.NeedCertificate;
    }

    const hasUseCertificate = certificate.in_use === InUseType.inUse;
    const inLocation = user?.location === LOCATION_TO_ID.engineers_workshop;
    const hasSkills = !!engineer?.skills?.length;

    const completedContracts = getEngineerCompletedContracts(
        user?.owner,
        contracts
    );
    const activeContract = getEngineerActiveContract(user?.owner, contracts);

    const signedByCitizen = !!activeContract?.client;
    const upgradeStarted = !!activeContract?.start_time;
    const upgradeFinishTime = (activeContract?.finishes_at || 0) * 1000;

    // only first time training
    if (!completedContracts.length) {
        if (!hasUseCertificate && !inLocation) {
            return CabinStatus.NeedTravel;
        }

        if (!hasUseCertificate) {
            return CabinStatus.NeedInauguration;
        }

        if (hasUseCertificate && !hasSkills) {
            return CabinStatus.NeedTraining;
        }
    }

    if (!hasUseCertificate) {
        return CabinStatus.NeedInauguration;
    }

    // todo: for first see stats
    // if (completedContracts.length === 1) {
    //     return CabinStatus.CanSeeStats;
    // }

    if (openSkillAction) {
        return CabinStatus.UnlockingSkill;
    }

    if (hasUseCertificate && hasSkills && !activeContract) {
        return CabinStatus.NeedContract;
    }

    if (!signedByCitizen) {
        return CabinStatus.NeedCitizen;
    }

    if (signedByCitizen && !upgradeStarted) {
        return CabinStatus.NeedUpgrade;
    }

    if (upgradeStarted && Date.now() < upgradeFinishTime) {
        return CabinStatus.UpgradeInProgress;
    }

    if (upgradeStarted && Date.now() >= upgradeFinishTime) {
        return CabinStatus.UpgradeCompleted;
    }

    return CabinStatus.ShowStats;
};
