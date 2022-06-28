import React from 'react';
import { Steps } from 'shared';
import styles from './styles.module.scss';

export const CreateOrderForm = () => {
    return (
        <div className={styles.form}>
            <Steps
                direction="vertical"
                current={1}
                steps={[
                    { title: 'hello', description: 'world' },
                    { title: 'hello', description: 'world' },
                    { title: 'hello', description: 'world' },
                ]}
            />
        </div>
    );
};
