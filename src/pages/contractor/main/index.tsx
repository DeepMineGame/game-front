import classNames from 'classnames';
import React from 'react';
import { ToggleMining } from 'features';
import { BackButton, Header } from 'shared/ui';
import styles from './index.module.scss';

const ContractorMainPage = () => {
    return (
        <div className={classNames(styles.page)}>
            <Header>Union button</Header>
            <BackButton />
            <ToggleMining />
        </div>
    );
};

export default ContractorMainPage;
