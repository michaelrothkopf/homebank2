export const getWeekDifference = (date2: Date, date1: Date) => {
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);
    return Math.abs(Math.round(diff));
}