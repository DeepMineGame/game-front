const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const getPadTime = (time: number) => (time > 9 ? time : `0${time}`);

export const getTimeLeft = (seconds: number, showDays?: boolean) => {
    if (seconds < 0) {
        return '00:00:00';
    }

    const d = showDays ? Math.floor(seconds / DAY) : 0;
    const h = Math.floor((seconds - d * DAY) / HOUR);
    const m = Math.floor((seconds - d * DAY - h * HOUR) / MINUTE);
    const s = Math.floor((seconds - d * DAY - h * HOUR - m * MINUTE) / SECOND);

    const timeWithHour = `${getPadTime(h)}:${getPadTime(m)}:${getPadTime(s)}`;

    return showDays ? `${getPadTime(d)}:${timeWithHour}` : timeWithHour;
};

export const secondsToTime = (seconds: number) =>
    new Date(seconds * 1000).toISOString().slice(11, 19);
