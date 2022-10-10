import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Button, desktopS, useMediaQuery } from 'shared';
import { useNavigate } from 'react-router-dom';
import { warehouse } from 'app/router/paths';
import { ATOMICHUB_URL } from 'app';
import { Col, Row } from 'antd';
import { UserInventoryType } from 'entities/smartcontract';
import { EquipmentTable } from '../EquipmentTable';
import contractorStyles from '../../styles.module.scss';
import styles from './styles.module.scss';

export type NotFullEquipmentsSetProps = {
    equipments: Record<string, UserInventoryType | undefined>;
};

export const NotFullEquipmentsSet: FC<NotFullEquipmentsSetProps> = ({
    equipments,
}) => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={cn(contractorStyles.title, styles.title)}>
                {t('pages.contractor.notFullEquipmentsSet.title')}
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div
                        className={cn(
                            contractorStyles.description,
                            styles.description
                        )}
                    >
                        {isDesktop
                            ? t(
                                  'pages.contractor.notFullEquipmentsSet.description'
                              )
                            : t(
                                  'pages.contractor.notFullEquipmentsSet.descriptionMobile'
                              )}
                    </div>
                    <Row>
                        <Col span={12}>
                            <Button
                                className={styles.button}
                                type="link"
                                onClick={() => navigate(warehouse)}
                            >
                                {t(
                                    'pages.contractor.notFullEquipmentsSet.check'
                                )}
                            </Button>
                        </Col>
                        <Col span={12} className={styles.secondButton}>
                            <Button
                                className={styles.button}
                                type="link"
                                onClick={() =>
                                    window.open(ATOMICHUB_URL, '_blank')
                                }
                            >
                                {t(
                                    'pages.contractor.notFullEquipmentsSet.goToMarket'
                                )}
                            </Button>
                        </Col>
                    </Row>
                </div>
                {isDesktop && <EquipmentTable equipments={equipments} />}
            </div>
        </div>
    );
};
