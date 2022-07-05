import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import styles from './styles.module.scss';

export const Link: React.FC<LinkProps> = (props) => (
    <RouterLink className={styles.link} {...props} />
);
