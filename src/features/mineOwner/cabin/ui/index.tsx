import { FC } from 'react';
import classNames from 'classnames';
import { mineOwnerCabinState } from '../../models';
import styles from './styles.module.scss';

type Props = {
    state?: mineOwnerCabinState;
};
export const MineOwnerCabin: FC<Props> = ({ children, state = 'default' }) => {
    return (
        <div
            className={classNames(styles.cabinWrapper, {
                [styles.progress]:
                    state === mineOwnerCabinState.everythingIsDone,
                [styles.incident]:
                    state ===
                    mineOwnerCabinState.contractWithLandlordWasTerminated,
            })}
        >
            {children}
        </div>
    );
};
