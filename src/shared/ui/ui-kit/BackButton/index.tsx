import React from 'react';
import cn from 'classnames';
import { ArrowLeftIcon } from 'shared/ui/icons';
import styles from './index.module.scss';

export const BackButton = () => {
    return (
        <div className={cn(styles.button)}>
            <ArrowLeftIcon />
            <div>Back</div>
        </div>
    );
};
