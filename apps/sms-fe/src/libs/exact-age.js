import dayjs from 'dayjs';
const exactAge = (birth) => {
    const now = dayjs();
    const y = now.diff(birth, 'y');
    let m = now.diff(dayjs(`${now.year()}-${birth.month() + 1}-${birth.date()}`), 'M');
    let d = now.diff(dayjs(`${now.year()}-${now.month() + 1}-${birth.date()}`), 'd');
    if (m < 0) {
        m = 11 + m;
    }
    if (d < 0) {
        d = 29 + d;
    }
    return {
        years: y,
        months: m,
        days: d,
    };
};
export default exactAge;
