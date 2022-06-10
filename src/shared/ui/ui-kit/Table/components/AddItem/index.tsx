import { PlusOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import styles from './styles.module.scss';

type Props = {
    text?: string;
    onClick?: () => void;
};

export const AddItem: FC<Props> = ({ text, onClick }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const navigateToServiceMarket = () => navigate(serviceMarket);
    return (
        <div
            onClick={onClick || navigateToServiceMarket}
            className={styles.item}
        >
            <PlusOutlined />{' '}
            {text || t('components.common.table.addNewContractor')}
        </div>
    );
};
