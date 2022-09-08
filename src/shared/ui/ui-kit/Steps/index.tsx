import { Steps as StepsAnt, StepProps, StepsProps } from 'antd';
import { FC } from 'react';
import './styles.module.scss';

type Props = {
    steps: StepProps[];
} & StepsProps;

export const Steps: FC<Props> = ({ steps, ...props }) => (
    <StepsAnt {...props}>
        {steps?.map((step) => (
            <StepsAnt.Step key={`${step.title}`} {...step} />
        ))}
    </StepsAnt>
);
