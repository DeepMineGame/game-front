import React from 'react';
import { Loader } from 'shared';

import styles from './styles.module.scss';

type Props = {
    size?: 'small' | 'default' | 'large';
};

export const LoadingScreen: React.FC<Props> = ({ size, children }) => (
    <section className={styles.loadingSection}>
        <Loader size={size} />
        {children}
    </section>
);
