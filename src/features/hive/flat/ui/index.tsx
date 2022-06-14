import React, { FC } from 'react';
import { useStore } from 'effector-react';
import cn from 'classnames';
import { isUserInHive } from '../../model';
import styles from './styles.module.scss';

export const Flat: FC = ({ children }) => {
    const isUserInFlat = useStore(isUserInHive);
    return (
        <div
            className={cn(styles.flat, {
                [styles.insideFlat]: isUserInFlat,
            })}
        >
            {children}
        </div>
    );
};
