import React, { FC } from 'react';
import classNames from 'classnames';
import { mineOwnerCabinState } from '../../model';
import styles from './styles.module.scss';

type Props = {
    state?: mineOwnerCabinState;
};
export const MineOwnerCabin: FC<Props> = ({ children, state = 'default' }) => {
    return (
        <div
            className={classNames(styles.cabinWrapper, {
                [styles.progress]: state === mineOwnerCabinState.isMineActive,
            })}
        >
            {children}
        </div>
    );
};
