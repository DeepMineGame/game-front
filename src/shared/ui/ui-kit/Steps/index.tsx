import { Steps as StepsA, StepProps, StepsProps } from 'antd';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
    steps: StepProps[];
} & StepsProps;

export const Steps: FC<Props> = ({ steps, ...props }) => {
    return (
        <StepsA {...props} className={styles.steps}>
            {steps?.map((step) => (
                <StepsA.Step {...step} />
            ))}
        </StepsA>
    );
};
