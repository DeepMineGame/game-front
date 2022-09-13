import { Nullable } from 'global';
import {
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
};

export const getStatus = ({
    certificate,
    user,
    engineer,
}: Nullable<EngineersStore>): CabinStatus => {
    if (!certificate) {
        return CabinStatus.NeedCertificate;
    }

    const hasUseCertificate = certificate.in_use === InUseType.inUse;
    const inLocation = user?.location === LOCATION_TO_ID.engineers_workshop;
    const hasSkills = !!engineer?.skills?.length;

    if (!hasUseCertificate && !inLocation) {
        return CabinStatus.NeedTravel;
    }

    if (!hasUseCertificate && inLocation) {
        return CabinStatus.NeedInauguration;
    }

    if (hasUseCertificate && inLocation && !hasSkills) {
        return CabinStatus.NeedTraining;
    }

    if (hasUseCertificate && inLocation && hasSkills) {
        return CabinStatus.NeedWork;
    }

    return CabinStatus.ShowStats;
};
