import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
    state?: 'default' | 'progress';
};
export const MineOwnerCabin: FC<Props> = ({ children, state = 'default' }) => {
    return (
        <div
            className={classNames(styles.cabinWrapper, {
                [styles.progress]: state === 'progress',
            })}
        >
            {children}
        </div>
    );
};
