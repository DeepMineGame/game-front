import cn from 'classnames';
import { Loader } from 'shared';
import { RarityType, EngineerSchema } from 'entities/smartcontract';
import { TrainingNftFull, TrainingNftStatus } from '../../model/types';

import styles from './styles.module.scss';

export type Props = {
    rarity?: RarityType;
    schemaType: EngineerSchema;
    templateId: number;
    src: string;
    level: number;
    status: TrainingNftStatus;
    width: number;
    height: number;
    onClick?: (nft: TrainingNftFull) => void;
    className?: string;
    isDisabled?: boolean;
};

export const Nft = ({
    className,
    src,
    rarity,
    schemaType,
    status,
    templateId,
    level,
    onClick,
    width,
    height,
    isDisabled,
}: Props) => {
    const handleClick = () => {
        onClick?.({ templateId, src, status, level, rarity, schemaType });
    };

    return (
        <button
            className={cn(styles.nftImage, className, {
                [styles.nftImageLearned]: status === TrainingNftStatus.learned,
                [styles.nftImageAvailable]:
                    status === TrainingNftStatus.available,
                [styles.nftImageLearning]:
                    status === TrainingNftStatus.learning,
            })}
            onClick={handleClick}
            disabled={isDisabled || status === TrainingNftStatus.learning}
            data-template-id={templateId}
        >
            <div className={styles.nftImageContent}>
                <img
                    alt=""
                    src={src}
                    height={height}
                    width={width}
                    loading="lazy"
                />
                {status === TrainingNftStatus.learning && (
                    <>
                        <div className={styles.nftImageLearningOverlay} />
                        <Loader className={styles.nftImageLearningSpin} />
                    </>
                )}
            </div>
        </button>
    );
};
