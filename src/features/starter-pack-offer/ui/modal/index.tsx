import { Button, Modal, Space, Typography } from 'antd';
import { desktopS, useMediaQuery, useQuery } from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
    $isStarterPackModalVisible,
    StaterPackGate,
    toggleStarterPackModalVisibilityEvent,
} from '../../model';
import box from './assets/box.png';
import cards from './assets/cards.png';
import styles from './styles.module.scss';

export const StarterPackOfferModal = () => {
    const isDesktop = useMediaQuery(desktopS);
    const isStarterPackModalVisible = useStore($isStarterPackModalVisible);
    const forwardFromOnboarding = Boolean(
        sessionStorage.getItem('forwardFromOnboarding')
    );
    useGate(StaterPackGate, { forwardFromOnboarding });
    const { t } = useTranslation();

    return (
        <Modal
            className={styles.modal}
            visible={isStarterPackModalVisible}
            footer={null}
            title={t('pages.home.choseYourStarterPack')}
            onCancel={() => toggleStarterPackModalVisibilityEvent()}
        >
            <Space
                direction={isDesktop ? 'horizontal' : 'vertical'}
                size="large"
            >
                <div>
                    <img className={styles.box} src={box} alt="newbie-box" />
                    <Button
                        type="primary"
                        ghost
                        className={styles.selectButton}
                        onClick={() => {
                            window.location.href =
                                'https://wax.atomichub.io/market?collection_name=deepminegame&schema_name=packs&template_id=337456';
                        }}
                    >
                        {t('pages.home.buyCrate')}
                    </Button>
                </div>
                <Typography.Title level={4}>OR</Typography.Title>
                <div>
                    <img
                        className={styles.cards}
                        src={cards}
                        alt="newbie-cars"
                    />
                    <Button
                        className={styles.selectButton}
                        type="primary"
                        ghost
                        onClick={() => {
                            window.location.href =
                                'https://shop.deepmine.world/shop/7';
                        }}
                    >
                        {t('pages.home.buySet')}
                    </Button>
                </div>
            </Space>
        </Modal>
    );
};
