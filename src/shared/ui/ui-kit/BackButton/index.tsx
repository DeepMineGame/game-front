import React, { FC, MouseEventHandler } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

type Props = {
    onClick: MouseEventHandler;
    className?: string;
};

export const BackButton: FC<Props> = ({ onClick, className }) => {
    const { t } = useTranslation();

    return (
        <div className={cn(styles.button, className)} onClick={onClick}>
            <LeftOutlined />
            <div>{t('kit.back')}</div>
        </div>
    );
};
