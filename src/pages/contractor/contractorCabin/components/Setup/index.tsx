import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Col, Row } from 'antd';
import { desktopS, useMediaQuery } from 'shared';
import { EquipmentTable, equipmentType } from '../EquipmentTable';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    hasShift?: boolean;
    equipments: equipmentType[];
}
export const Setup: FC<Props> = ({ hasShift, equipments }) => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.setup.title')}
            </div>
            <Row gutter={[32, 32]}>
                <Col span={isDesktop ? 14 : 24}>
                    <div
                        className={cn(contractorStyles.description, {
                            [styles.descriptionCenter]: hasShift,
                            [styles.description]: !hasShift,
                        })}
                    >
                        {t(
                            `pages.contractor.setup.${
                                hasShift ? 'descriptionShort' : 'description'
                            }`
                        )}
                    </div>
                </Col>
                {isDesktop && (
                    <Col span={10}>
                        <EquipmentTable equipments={equipments} />
                    </Col>
                )}
            </Row>
        </div>
    );
};
