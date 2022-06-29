import { Steps as StepsA, StepProps, StepsProps } from 'antd';
import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
    steps: StepProps[];
} & StepsProps;

export const Steps: FC<Props> = ({ steps, ...props }) => {
    return (
        <StepsA {...props} className={cn(styles.steps, props?.className)}>
            {steps?.map((step, index) => (
                <StepsA.Step key={index} {...step} />
            ))}
        </StepsA>
    );
};
