import { PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import styles from './styles.module.scss';

type Props = {
    text?: string;
};

export const Plugin: FC<Props> = ({ text }) => {
    const { t } = useTranslation();

    return (
        <Button disabled className={styles.plugin}>
            <PlusOutlined />
            <span style={{ margin: 0 }}>{text || t('add consumable')}</span>
        </Button>
    );
};
