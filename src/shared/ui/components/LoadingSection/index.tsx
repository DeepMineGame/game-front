import React from 'react';
import { Loader } from 'shared';

import styles from './styles.module.scss';

type Props = {
    size?: 'small' | 'default' | 'large';
};

export const LoadingSection: React.FC<Props> = ({ size }) => (
    <section className={styles.loadingSection}>
        <Loader size={size} />
    </section>
);
