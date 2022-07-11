const SECOND = 1;
export const MINUTE_IN_SECONDS = 60 * SECOND;
export const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
export const DAY_IN_SECONDS = 24 * HOUR_IN_SECONDS;

const getPadTime = (time: number) => (time > 9 ? time : `0${time}`);

export const getTimeLeft = (seconds: number, showDays?: boolean) => {
    if (seconds < 0) {
        return '00:00:00';
    }

    const d = showDays ? Math.floor(seconds / DAY_IN_SECONDS) : 0;
    const h = Math.floor((seconds - d * DAY_IN_SECONDS) / HOUR_IN_SECONDS);
    const m = Math.floor(
        (seconds - d * DAY_IN_SECONDS - h * HOUR_IN_SECONDS) / MINUTE_IN_SECONDS
    );
    const s = Math.floor(
        (seconds -
            d * DAY_IN_SECONDS -
            h * HOUR_IN_SECONDS -
            m * MINUTE_IN_SECONDS) /
            SECOND
    );

    const timeWithHour = `${getPadTime(h)}:${getPadTime(m)}:${getPadTime(s)}`;

    return showDays ? `${getPadTime(d)}:${timeWithHour}` : timeWithHour;
};

export const secondsToDate = (seconds: number) =>
    new Date(seconds * 1000).toLocaleDateString();

export const secondsToTime = (seconds: number) =>
    new Date(seconds * 1000).toISOString().slice(11, 19);

export const secondsToDays = (seconds: number) =>
    Math.ceil(seconds / DAY_IN_SECONDS);

export const secondsToHour = (seconds: number) =>
    Math.ceil(seconds / HOUR_IN_SECONDS);

export const toLocaleDate = (
    date: number,
    options?: Intl.DateTimeFormatOptions
) => {
    return new Date(date).toLocaleString('en-gb', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
    });
};
