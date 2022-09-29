import { FC } from 'react';
import classNames from 'classnames';
import { useUserLocation } from 'shared';
import { useNavigate } from 'react-router-dom';
import { mineManagement } from 'app/router/paths';
import { mineOwnerCabinState } from '../../models';
import styles from './styles.module.scss';

type Props = {
    state?: mineOwnerCabinState;
};
export const MineOwnerCabin: FC<Props> = ({ children, state = 'default' }) => {
    const inLocation = useUserLocation();
    const navigate = useNavigate();

    return (
        <div
            className={classNames(styles.cabinWrapper, {
                [styles.cabinDefaultInside]: inLocation.mineDeck,
                [styles.progress]:
                    state === mineOwnerCabinState.everythingIsDone,
                [styles.incident]:
                    state ===
                    mineOwnerCabinState.contractWithLandlordWasTerminated,
            })}
        >
            {children}
            <div
                className={styles.panel}
                onClick={() => navigate(mineManagement)}
            />
        </div>
    );
};
