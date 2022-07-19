import React, { FC } from 'react';
import { Tag as TagA, TagProps } from 'antd';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = TagProps & { kind?: 'primary' | 'secondary' };

const Tag: FC<Props> = ({ children, kind = 'primary', ...props }) => {
    return (
        <TagA
            className={cn(styles.tag, {
                [styles.tagPrimary]: kind === 'primary',
                [styles.tagSecondary]: kind === 'secondary',
            })}
            {...props}
        >
            {children}
        </TagA>
    );
};

export { Tag };
