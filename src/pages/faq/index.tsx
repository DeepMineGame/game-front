import { DeepMineLogo, ExternalLink, Title } from 'shared';
import { useTranslation } from 'react-i18next';
import { Space, Typography } from 'antd';
import styles from './styles.module.scss';

export const FaqPage = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <DeepMineLogo className={styles.logo} />
            <Title className={styles.title}>FAQ</Title>

            <Space direction="vertical">
                <Title level={5}>{t('pages.faq.watIs')}</Title>
                <Typography.Paragraph className={styles.text}>
                    {t('pages.faq.deepMineDescription')}
                </Typography.Paragraph>
            </Space>

            <Space direction="vertical">
                <Title level={5}>{t('pages.faq.wasRelease')}</Title>
                <Typography.Paragraph className={styles.text}>
                    {t('pages.faq.closeAlpha')}
                    <ExternalLink href="https://medium.com/@deepmineworld/how-to-create-a-wallet-on-the-wax-blockchain-ae556388a2b5">
                        {' '}
                        {t('components.common.social.medium')}.
                    </ExternalLink>{' '}
                    {t('pages.faq.needNft')}
                    <ExternalLink href="https://wax.atomichub.io/explorer/collection/deepminegame">
                        {' '}
                        {t('components.common.social.atomicHub')}
                    </ExternalLink>{' '}
                    {t('pages.faq.more')}{' '}
                    <ExternalLink href="https://docs.deepmine.world/deepmine/deepmine-gaming-nfts/equipment">
                        {t('pages.faq.here')}
                    </ExternalLink>{' '}
                    {t('pages.faq.explore')}{' '}
                    <ExternalLink href="https://shelter.deepmine.world/">
                        {t('components.common.shelter')}
                    </ExternalLink>{' '}
                    {t('pages.faq.stake')}
                </Typography.Paragraph>
            </Space>

            <Space direction="vertical">
                <Title level={5}>{t('pages.faq.whatHappened')}</Title>
                <Typography.Paragraph className={styles.text}>
                    {t('pages.faq.distantFuture')}
                    <ExternalLink href="https://www.youtube.com/watch?v=t_kFHtf_Mvk">
                        {' '}
                        {t('pages.faq.coolVideo')}
                    </ExternalLink>{' '}
                    {t('pages.faq.showCase')}
                    <ExternalLink href="https://docs.deepmine.world/deepmine/deepmine-gaming-nfts/mine">
                        {' '}
                        {t('components.common.mine.mines')}
                    </ExternalLink>{' '}
                    {t('pages.faq.inDifferent')}{' '}
                    <ExternalLink href="https://docs.deepmine.world/deepmine/deepmine-gaming-nfts/areas">
                        {' '}
                        {t('pages.faq.areas')}
                    </ExternalLink>{' '}
                    {t('pages.faq.ofElezar')}
                </Typography.Paragraph>
            </Space>

            <Space direction="vertical">
                <Title level={5}>{t('pages.faq.areasMinesEquipment')}</Title>
                <Typography.Paragraph className={styles.text}>
                    {t('pages.faq.thePlanet')}{' '}
                    <ExternalLink href="https://docs.deepmine.world/deepmine/deepmine-entities/game-roles/specialist/geologist">
                        {t('roles.geologists')}
                    </ExternalLink>{' '}
                    {t('pages.faq.toDiscover')}
                    <ExternalLink href="https://docs.deepmine.world/deepmine/">
                        {' '}
                        {t('pages.faq.here')}
                    </ExternalLink>
                </Typography.Paragraph>
            </Space>

            <Space direction="vertical">
                <Title level={5}>{t('pages.faq.whatRoles')}</Title>
                <Typography.Paragraph className={styles.text}>
                    {t('pages.faq.thereRole')}
                    {' - '}
                    <ExternalLink href="https://docs.deepmine.world/deepmine/deepmine-entities/game-roles/landlord">
                        {t('roles.landlord')}
                    </ExternalLink>
                    ,{' '}
                    <ExternalLink href="https://docs.deepmine.world/deepmine/deepmine-entities/game-roles/mine-owner">
                        {t('roles.mineOwner')}
                    </ExternalLink>{' '}
                    {t('pages.faq.and')}{' '}
                    <ExternalLink href="https://docs.deepmine.world/deepmine/deepmine-entities/game-roles/contractor">
                        {t('roles.contractor')}
                    </ExternalLink>
                    . {t('pages.faq.moreRoles')}.{' '}
                </Typography.Paragraph>
            </Space>

            <Space direction="vertical">
                <Title level={5}>{t('pages.faq.rolesPoint')}</Title>
                <Typography.Paragraph className={styles.text}>
                    {t('pages.faq.miningDme')}
                </Typography.Paragraph>
            </Space>

            <Space direction="vertical">
                <Title level={5}>{t('pages.faq.whyLegit')}</Title>
                <ul className={styles.text}>
                    <li>{t('pages.faq.seeLanding')}</li>
                    <li>{t('pages.faq.eugen')}</li>
                    <li>{t('pages.faq.community')}</li>
                    <li>{t('pages.faq.weAreChampionsMyFriend')}</li>
                    <li>{t('pages.faq.weAreChampionsOfTheWorld')}</li>
                </ul>
            </Space>
        </div>
    );
};
