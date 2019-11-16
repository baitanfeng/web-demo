{
    const weekDayCNList = ['', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

    function formatTimestamp (timestamp = Date.now()) {
        const today = convertTimestampToObject();
        const time = convertTimestampToObject(timestamp);
        
        if (isToday(time, today)) {
            return `${time.hour}:${time.minute}`;
        }

        if (isYesterday(time, today)) {
            return `昨天 ${time.hour}:${time.minute}`;
        }

        if (isCurrentWeek(time, today)) {
            return `${time.weekDayCN} ${time.hour}:${time.minute}`;
        }

        return `${time.year}年${time.month}月${time.day}日 ${time.hour}:${time.minute}`;
    }

    function convertTimestampToObject (timestamp = Date.now()) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = convertNumberToString(date.getMonth() + 1);
        const day = convertNumberToString(date.getDate());
        const hour = convertNumberToString(date.getHours());
        const minute = convertNumberToString(date.getMinutes());
        const second = convertNumberToString(date.getSeconds());
        const weekDay = date.getDay() === 0 ? 7 : date.getDay();
        const weekDayCN = weekDayCNList[weekDay];

        return {
            year,
            month,
            day,
            hour,
            minute,
            second,
            weekDay,
            weekDayCN
        };
    }

    function isToday (time1 = convertTimestampToObject(), time2 = convertTimestampToObject()) {
        return time1.year === time2.year && time1.month === time2.month && time1.day === time2.day;
    }

    function isYesterday (time1 = convertTimestampToObject(), time2 = convertTimestampToObject()) {
        const timestamp1 = addDay(time1, 1).getTime();
        const t1 = convertTimestampToObject(timestamp1);
        return isToday(t1, time2);
    }

    function isCurrentWeek(time1 = convertTimestampToObject(), time2 = convertTimestampToObject()) {
        const timestamp1 = addDay(time1, 7).getTime();
        const timestamp2 = addDay(time2, 0).getTime();
        return (timestamp1 > timestamp2) && (time1.weekDay <= time2.weekDay);
    }

    function addDay (time = convertTimestampToObject(), day = 0) {
        return new Date(time.year, Number.parseInt(time.month) - 1, Number.parseInt(time.day) + Number.parseInt(day));
    }

    function convertNumberToString (number = 0, maxLength = 2, fillString = '0') {
        return String(number).padStart(maxLength, fillString);
    }

    console.log(formatTimestamp());
    console.log(formatTimestamp(new Date(2019, 10, 15, 23, 08).getTime()));
    console.log(formatTimestamp(new Date(2019, 10, 14, 23, 08).getTime()));
    console.log(formatTimestamp(new Date(2019, 10, 13, 23, 08).getTime()));
    console.log(formatTimestamp(new Date(2019, 10, 11, 23, 08).getTime()));
    console.log(formatTimestamp(new Date(2019, 10, 10, 23, 08).getTime()));
}