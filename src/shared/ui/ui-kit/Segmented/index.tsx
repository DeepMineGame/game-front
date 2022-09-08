import { FC, Ref } from 'react';
import { Segmented as SegmentedAnt, SegmentedProps } from 'antd';

type Props = SegmentedProps & { ref?: Ref<HTMLDivElement> };

export const Segmented: FC<Props> = (props) => <SegmentedAnt {...props} />;
