{
    const
        reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
        match = reDate.exec('2018-04-30'),
        year = match.groups.year, // 2018
        month = match.groups.month, // 04
        day = match.groups.day; // 30

    console.log(year, month, day);
}

{
    const
        reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
        d = '2018-04-30',
        usDate = d.replace(reDate, '$<month>-$<day>-$<year>');

    console.log(usDate);
}

{
    const
        reLookbehind = /(?<=\D)\d+/,
        match = reLookbehind.exec('$123.89');

    console.log(match[0]);
}