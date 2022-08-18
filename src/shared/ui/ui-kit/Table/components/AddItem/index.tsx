import { PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { serviceMarket } from 'app/router/paths';
import styles from './styles.module.scss';

type Props = {
    className?: string;
    text: string;
    onClick?: () => void;
    link?: string;
};

export const AddItem: FC<Props> = ({ text, onClick, className, link }) => {
    const navigate = useNavigate();
    const navigateToServiceMarket = () => navigate(link || serviceMarket);
    return (
        <div
            onClick={onClick || navigateToServiceMarket}
            className={cn(styles.item, className)}
        >
            <PlusOutlined /> {text}
        </div>
    );
};
