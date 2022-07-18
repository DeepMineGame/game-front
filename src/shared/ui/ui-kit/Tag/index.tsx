import React, { FC } from 'react';
import { Tag as TagA, TagProps } from 'antd';
import styles from './styles.module.scss';

const Tag: FC<TagProps> = ({ children, ...props }) => {
    return (
        <TagA className={styles.tag} {...props}>
            {children}
        </TagA>
    );
};

export { Tag };
