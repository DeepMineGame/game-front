import { LoadingOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Button } from '../../../Button';
import styles from './styles.module.scss';

type Props = {
    className?: string;
    text?: string;
    onClick?: () => void;
};

export const SearchingItem: FC<Props> = ({ text, onClick, className }) => {
    const { t } = useTranslation();

    return (
        <div onClick={onClick} className={cn(styles.item, className)}>
            <LoadingOutlined />
            <span className={styles.text}>{text}</span>
            <Button type="ghost">{t('components.common.button.cancel')}</Button>
        </div>
    );
};
