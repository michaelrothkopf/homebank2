export const getUnixTime = (): number => {
    return Math.floor(new Date().valueOf() / 1000);
}