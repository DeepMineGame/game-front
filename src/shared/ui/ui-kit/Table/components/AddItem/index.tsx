import { PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { serviceMarket } from 'app/router/paths';
import styles from './styles.module.scss';

type Props = {
    className?: string;
    text?: string;
    onClick?: () => void;
};

export const AddItem: FC<Props> = ({ text, onClick, className }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const navigateToServiceMarket = () => navigate(serviceMarket);
    return (
        <div
            onClick={onClick || navigateToServiceMarket}
            className={cn(styles.item, className)}
        >
            <PlusOutlined />{' '}
            {text || t('components.common.table.addNewContractor')}
        </div>
    );
};
