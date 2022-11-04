import { Col, Row } from 'antd';
import { Text } from 'shared';
import { TrainingNftFull } from '../../../model/types';
import { Nft } from '../../nft';

import styles from './styles.module.scss';

type Props = {
    nftData: TrainingNftFull;
    subtitle: string;
};

const nftWidth = 154;
const nftHeight = 214;

export const MainInformation: React.FC<Props> = ({
    nftData,
    subtitle,
    children,
}) => {
    const { templateId, level, src, status, rarity, schemaType } = nftData;

    return (
        <Row gutter={[16, 0]}>
            <Col flex={`${nftWidth}px`}>
                <Nft
                    className={styles.nft}
                    templateId={templateId}
                    level={level}
                    src={src}
                    status={status}
                    width={nftWidth}
                    height={nftHeight}
                    rarity={rarity}
                    schemaType={schemaType}
                    isDisabled
                />
            </Col>
            <Col flex="1">
                <Row gutter={[0, 12]}>
                    <Col span={24}>
                        <Text className={styles.statusText} strong>
                            {subtitle}
                        </Text>
                    </Col>
                    <Col span={24}>{children}</Col>
                </Row>
            </Col>
        </Row>
    );
};
