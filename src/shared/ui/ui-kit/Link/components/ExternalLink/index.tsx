import React from 'react';

import styles from '../../styles.module.scss';

export const ExternalLink: React.FC<{ href: string }> = (props) => (
    <a className={styles.link} {...props}>
        {props.children}
    </a>
);
