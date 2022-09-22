import { UnlockOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
    className?: string;
    text?: string;
    onClick?: () => void;
};

export const DiscoverItem: FC<Props> = ({ text, onClick, className }) => {
    const { t } = useTranslation();
    return (
        <div onClick={onClick} className={cn(styles.item, className)}>
            <UnlockOutlined />{' '}
            {text || t('components.common.table.openNewMine')}
        </div>
    );
};
