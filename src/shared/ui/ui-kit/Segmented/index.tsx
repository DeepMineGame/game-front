import React, { FC, Ref } from 'react';
import { Segmented as SegmentedAnt, SegmentedProps } from 'antd';

type Props = SegmentedProps & { ref?: Ref<HTMLDivElement> | undefined };

export const Segmented: FC<Props> = (props) => {
    return <SegmentedAnt {...props} />;
};
