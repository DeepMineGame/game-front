import React, { FC, MouseEventHandler } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

type Props = {
    onClick: MouseEventHandler;
};

export const BackButton: FC<Props> = ({ onClick }) => {
    const { t } = useTranslation();

    return (
        <div className={cn(styles.button)} onClick={onClick}>
            <LeftOutlined />
            <div>{t('kit.back')}</div>
        </div>
    );
};
