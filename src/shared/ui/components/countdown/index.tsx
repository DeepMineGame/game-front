import { FC, useEffect } from 'react';
import { useTick } from 'shared/lib/hooks';
import { getTimeLeftFromUtc } from 'shared/ui/utils';

const CountDown: FC<{ finishesAt?: number; onFinish(): void }> = ({
    finishesAt = 0,
    onFinish,
}) => {
    const isFinished = Date.now() >= finishesAt * 1000;

    useTick(!isFinished);

    useEffect(() => {
        if (isFinished) {
            onFinish();
        }
    }, [isFinished, onFinish]);

    return <span>{getTimeLeftFromUtc(finishesAt)}</span>;
};

export { CountDown };
