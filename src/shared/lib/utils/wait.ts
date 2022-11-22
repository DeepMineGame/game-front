const getMs = (seconds: number) => seconds * 1000;

export const wait = (seconds: number) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), getMs(seconds));
    });
